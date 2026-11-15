import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  UploadCloud, 
  Navigation,
  Trash2,
  Sparkles,
  Info,
  Check,
  Building2
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { CATEGORIES } from '../data/categories';
import { VADODARA_CENTER, VADODARA_AREAS } from '../data/mockReports';
import { useReports } from '../context/ReportsContext';
import { ROUTES } from '../utils/constants';

// Clean custom pin for Leaflet location picker
const pickerIcon = L.divIcon({
  className: 'location-picker-pin',
  html: `
    <div style="
      background-color: #171717;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #FFD43B;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: #FFD43B;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Leaflet map click listener
function MapClickHandler({ position, setPosition, setAddress, selectedArea }) {
  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      setPosition(coords);
      setAddress(`Pinned Location (${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}), ${selectedArea || 'City'}`);
    },
  });
  return position ? <Marker position={position} icon={pickerIcon} /> : null;
}

// Leaflet recenter helper
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1 });
    }
  }, [center, map]);
  return null;
}

const SAMPLE_PHOTOS = [
  {
    label: 'Road Pothole',
    category: 'potholes',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Garbage Dump',
    category: 'garbage',
    url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Water Pipe Burst',
    category: 'water-leakage',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Dark Streetlight',
    category: 'streetlights',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
  },
];

export const NewReportPage = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('potholes');
  const [priority, setPriority] = useState('HIGH');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Location state (centered on city map)
  const [selectedArea, setSelectedArea] = useState('Alkapuri');
  const [ward, setWard] = useState('Ward 8');
  const [address, setAddress] = useState('Near Havmor Circle, RC Dutt Road');
  const [coordinates, setCoordinates] = useState([22.3108, 73.1704]);
  const [mapCenter, setMapCenter] = useState([22.3108, 73.1704]);

  // Photos state
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  ]);

  // Citizen info
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdReport, setCreatedReport] = useState(null);

  // When area is chosen from preset buttons
  const handleSelectArea = (areaObj) => {
    setSelectedArea(areaObj.name);
    setWard(areaObj.ward);
    setCoordinates(areaObj.coordinates);
    setMapCenter(areaObj.coordinates);
    setAddress(`Near ${areaObj.name} Main Road`);
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCoords = [pos.coords.latitude, pos.coords.longitude];
          setCoordinates(newCoords);
          setMapCenter(newCoords);
          setAddress(`Current GPS Pin (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        },
        () => {
          setCoordinates(VADODARA_CENTER);
          setMapCenter(VADODARA_CENTER);
          setAddress('Central Market / Municipal Administrative Office');
        }
      );
    } else {
      setCoordinates(VADODARA_CENTER);
      setMapCenter(VADODARA_CENTER);
    }
  };

  const handleAddSamplePhoto = (url) => {
    if (!photos.includes(url)) {
      setPhotos([...photos, url]);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setPhotos([...photos, fakeUrl]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const catObj = CATEGORIES.find((c) => c.id === category);

    setTimeout(() => {
      const newRep = addReport({
        title: title || `${catObj?.name || 'Civic Issue'} reported in ${selectedArea}`,
        category,
        categoryLabel: catObj?.name || 'Civic Issue',
        address,
        area: selectedArea,
        ward,
        coordinates,
        priority,
        reportedBy: citizenName || 'Citizen',
        description: description || `Issue reported by citizen at ${address}. Municipal attention requested.`,
        images: photos,
      });

      setIsSubmitting(false);
      setCreatedReport(newRep);
    }, 700);
  };

  // SUCCESS SCREEN
  if (createdReport) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF5CC] border-2 border-[#FFD43B] text-[#171717] mx-auto flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-9 h-9 text-[#171717]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Complaint Registered
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
            Issue Successfully Reported!
          </h1>
          <p className="text-sm text-[#666666] max-w-lg mx-auto">
            Your complaint has been assigned tracking ID <strong className="font-mono text-[#171717]">{createdReport.id}</strong> and routed to the local municipal engineering division.
          </p>
        </div>

        {/* Complaint Summary Card */}
        <Card padding="md" className="space-y-4 border-[#171717]/20 shadow-md">
          <div className="flex items-start justify-between gap-3 border-b border-[#EAEAEA] pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#666666]">
                {createdReport.id}
              </span>
              <h3 className="font-bold text-base text-[#171717] mt-0.5">
                {createdReport.title}
              </h3>
            </div>
            <Badge status={createdReport.status} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F7F7F5] p-2.5 rounded-[10px]">
              <span className="text-[#666666] block">Location</span>
              <span className="font-semibold text-[#171717]">{createdReport.location.area}</span>
            </div>
            <div className="bg-[#F7F7F5] p-2.5 rounded-[10px]">
              <span className="text-[#666666] block">Jurisdiction</span>
              <span className="font-semibold text-[#171717]">{createdReport.location.ward}</span>
            </div>
          </div>

          <div className="text-xs text-[#666666] bg-[#FFF5CC]/60 p-3 rounded-[10px] border border-[#FFD43B]/40 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            <span>
              This issue is now visible on the <strong>Live City Map</strong>. Fellow citizens can upvote it to increase resolution priority.
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              to={`/map?highlight=${createdReport.id}`}
              variant="primary"
              size="md"
              className="w-full sm:w-auto font-semibold"
              leftIcon={MapPin}
            >
              View on Map
            </Button>
            <Button
              to={ROUTES.REPORT_DETAIL(createdReport.id)}
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            >
              Track Issue Progress
            </Button>
            <Button
              to={ROUTES.REPORTS}
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              Browse Feed
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div>
        <Link
          to={ROUTES.REPORTS}
          className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#171717] mb-2 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Reports
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Report a Civic Issue
            </h1>
            <p className="text-sm text-[#666666]">
              Pinpoint the issue on the map, provide details, attach photographs, and notify municipal repair squads.
            </p>
          </div>
        </div>
      </div>

      {/* Step Wizard Bar */}
      <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
        {[
          { num: 1, label: 'Category' },
          { num: 2, label: 'Details' },
          { num: 3, label: 'Map Location' },
          { num: 4, label: 'Photos & Submit' },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setStep(s.num)}
            className={`p-2.5 rounded-[12px] border text-left flex items-center gap-2 transition-all ${
              step === s.num
                ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                : step > s.num
                ? 'bg-white text-[#171717] border-[#FFD43B] bg-[#FFF5CC]/30'
                : 'bg-white text-[#888888] border-[#EAEAEA]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step === s.num
                  ? 'bg-[#FFD43B] text-[#171717]'
                  : step > s.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#F7F7F5] text-[#888888]'
              }`}
            >
              {step > s.num ? <Check className="w-3 h-3" /> : s.num}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: CATEGORY & PRIORITY */}
      {step === 1 && (
        <Card padding="md" className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#171717] font-heading">
              1. What issue are you experiencing?
            </h3>
            <p className="text-xs text-[#666666] mt-0.5">
              Select the primary category of the infrastructure problem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-[14px] border text-left transition-all flex flex-col justify-between ${
                  category === cat.id
                    ? 'border-[#171717] bg-[#171717] text-white shadow-md'
                    : 'border-[#EAEAEA] bg-white text-[#171717] hover:border-[#171717]/40 hover:bg-[#FDFDFD]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        category === cat.id ? 'bg-[#FFD43B] text-[#171717]' : 'bg-[#FFF5CC] text-[#171717]'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    {category === cat.id && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FFD43B] text-[#171717]">
                        Selected
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm">{cat.name}</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${category === cat.id ? 'text-neutral-300' : 'text-[#666666]'}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Severity selector */}
          <div className="pt-4 border-t border-[#EAEAEA] space-y-2">
            <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
              Issue Urgency / Severity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'LOW', label: 'Low', desc: 'Minor inconvenience' },
                { id: 'MEDIUM', label: 'Medium', desc: 'Affects daily routine' },
                { id: 'HIGH', label: 'Urgent', desc: 'Active hazard or traffic blocked' },
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`p-3 rounded-[10px] border text-left text-xs transition-colors ${
                    priority === p.id
                      ? 'border-[#171717] bg-[#171717] text-white font-semibold'
                      : 'border-[#EAEAEA] bg-white text-[#171717] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <div className="font-bold">{p.label}</div>
                  <div className={`text-[10px] ${priority === p.id ? 'text-neutral-300' : 'text-[#666666]'}`}>
                    {p.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="md"
              rightIcon={ArrowRight}
              onClick={() => setStep(2)}
              className="font-semibold"
            >
              Continue to Details
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: PROBLEM DESCRIPTION */}
      {step === 2 && (
        <Card padding="md" className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#171717] font-heading">
              2. Describe the Problem
            </h3>
            <p className="text-xs text-[#666666] mt-0.5">
              Clear titles and descriptions help dispatchers assign the appropriate repair machinery.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5">
                Complaint Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Broken water pipeline leaking across pedestrian sidewalk"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
              />
              <p className="text-[11px] text-[#888888] mt-1">
                Mention landmark and issue clearly in 10-15 words.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5">
                Detailed Explanation & Safety Hazard *
              </label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how severe the problem is, how many days it has been open, whether accidents have occurred, and specific nearest landmarks..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EAEAEA]">
            <Button
              variant="secondary"
              size="md"
              leftIcon={ArrowLeft}
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              rightIcon={ArrowRight}
              onClick={() => {
                if (!title) {
                  const catObj = CATEGORIES.find((c) => c.id === category);
                  setTitle(`${catObj?.name || 'Civic Issue'} near ${selectedArea}`);
                }
                setStep(3);
              }}
              className="font-semibold"
            >
              Continue to Location Picker
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: INTERACTIVE LEAFLET PIN PICKER */}
      {step === 3 && (
        <Card padding="md" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#171717] font-heading flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#171717]" />
                3. Pinpoint Location on City Map
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Click anywhere on the map to place an accurate GPS pin for response teams.
              </p>
            </div>

            <Button
              type="button"
              variant="subtle"
              size="sm"
              leftIcon={Navigation}
              onClick={handleUseCurrentLocation}
              className="shrink-0 font-medium border border-[#FFD43B]/60"
            >
              Use My Current GPS
            </Button>
          </div>

          {/* Neighborhood Fast Selection Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#666666] uppercase tracking-wider block">
              Quick Jump to City Areas:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {VADODARA_AREAS.map((area) => (
                <button
                  type="button"
                  key={area.name}
                  onClick={() => handleSelectArea(area)}
                  className={`px-2.5 py-1 rounded-[8px] transition-colors ${
                    selectedArea === area.name
                      ? 'bg-[#171717] text-white font-semibold'
                      : 'bg-[#F7F7F5] text-[#171717] border border-[#EAEAEA] hover:border-[#CCCCCC]'
                  }`}
                >
                  {area.name} <span className="text-[10px] opacity-70">({area.ward})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Leaflet Map Picker */}
          <div className="rounded-[14px] overflow-hidden border border-[#171717]/20 shadow-inner h-80 relative">
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapRecenter center={mapCenter} />
              <MapClickHandler
                position={coordinates}
                setPosition={setCoordinates}
                setAddress={setAddress}
                selectedArea={selectedArea}
              />
            </MapContainer>

            {/* Instruction overlay badge */}
            <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-[8px] text-[11px] text-[#171717] border border-[#EAEAEA] shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD43B] animate-pulse"></span>
              Click map to reposition pin
            </div>
          </div>

          {/* Address and Ward Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Street Address or Nearest Landmark *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Near Market Circle, 10th Cross Road"
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Ward / Zone Division
              </label>
              <input
                type="text"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#F7F7F5] border border-[#EAEAEA] rounded-[10px] text-[#171717]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EAEAEA]">
            <Button
              variant="secondary"
              size="md"
              leftIcon={ArrowLeft}
              onClick={() => setStep(2)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              rightIcon={ArrowRight}
              onClick={() => setStep(4)}
              className="font-semibold"
            >
              Continue to Evidence
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: PHOTOS, CONTACT & FINAL SUBMIT */}
      {step === 4 && (
        <Card padding="md" className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#171717] font-heading">
              4. Photographs & Submission
            </h3>
            <p className="text-xs text-[#666666] mt-0.5">
              Upload clear photographs of the hazard so field teams can prepare necessary repair materials.
            </p>
          </div>

          {/* Photo Gallery & Uploader */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                Attached Evidence ({photos.length})
              </span>
              <label className="cursor-pointer text-xs font-semibold text-[#171717] bg-[#FFF5CC] px-2.5 py-1 rounded-[8px] border border-[#FFD43B]/60 hover:bg-[#FFD43B] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                + Upload Photo
              </label>
            </div>

            {/* Photos Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-[12px] overflow-hidden border border-[#EAEAEA] aspect-video bg-neutral-100 shadow-sm"
                >
                  <img
                    src={url}
                    alt={`Evidence ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#171717]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Sample Photos */}
            <div className="pt-2">
              <span className="text-[11px] text-[#666666] block mb-1.5">
                Quick-select sample photo for preview:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PHOTOS.map((sample) => (
                  <button
                    type="button"
                    key={sample.label}
                    onClick={() => handleAddSamplePhoto(sample.url)}
                    className="text-xs px-2.5 py-1 rounded-[8px] bg-[#F7F7F5] border border-[#EAEAEA] hover:border-[#171717] text-[#171717] flex items-center gap-1.5"
                  >
                    <Camera className="w-3 h-3 text-[#666666]" />
                    <span>{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Citizen Reporter Details */}
          <div className="pt-4 border-t border-[#EAEAEA] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
              Contact Details (Optional for SMS / Progress Updates)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFD43B]/60 text-[#171717]"
                />
              </div>
            </div>
          </div>

          {/* Final Review Summary */}
          <div className="p-3.5 bg-[#FFF5CC]/50 rounded-[12px] border border-[#FFD43B]/50 text-xs space-y-1">
            <div className="font-bold text-[#171717]">Complaint Summary:</div>
            <div className="text-[#666666]">
              • <strong>Category:</strong> {CATEGORIES.find((c) => c.id === category)?.name} ({priority} Priority)
            </div>
            <div className="text-[#666666]">
              • <strong>Location:</strong> {address} ({selectedArea}, {ward})
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EAEAEA]">
            <Button
              variant="secondary"
              size="md"
              leftIcon={ArrowLeft}
              onClick={() => setStep(3)}
            >
              Back to Location
            </Button>
            <Button
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              className="font-bold shadow-md"
              rightIcon={CheckCircle2}
            >
              Submit Complaint
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NewReportPage;
