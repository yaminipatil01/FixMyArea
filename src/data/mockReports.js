export const VADODARA_CENTER = [22.3072, 73.1812];

export const VADODARA_AREAS = [
  { name: 'Alkapuri', coordinates: [22.3108, 73.1704], ward: 'Ward 8' },
  { name: 'Sayajigunj', coordinates: [22.3125, 73.1865], ward: 'Ward 7' },
  { name: 'Akota', coordinates: [22.2985, 73.1668], ward: 'Ward 9' },
  { name: 'Fatehgunj', coordinates: [22.3248, 73.1876], ward: 'Ward 5' },
  { name: 'Karelibaug', coordinates: [22.3214, 73.2038], ward: 'Ward 4' },
  { name: 'Manjalpur', coordinates: [22.2682, 73.1956], ward: 'Ward 14' },
  { name: 'Gotri', coordinates: [22.3188, 73.1412], ward: 'Ward 10' },
  { name: 'Subhanpura', coordinates: [22.3292, 73.1624], ward: 'Ward 6' },
  { name: 'Mandvi / Old City', coordinates: [22.2995, 73.2096], ward: 'Ward 1' },
  { name: 'Waghodia Road', coordinates: [22.2954, 73.2381], ward: 'Ward 15' },
];

export const MOCK_REPORTS = [
  {
    id: 'FMA-1042',
    title: 'Severe pothole cluster on RC Dutt Road near Alkapuri Circle',
    category: 'potholes',
    categoryLabel: 'Potholes & Roads',
    location: {
      address: 'Near Alkapuri Circle, Opposite Express Hotel, RC Dutt Road',
      area: 'Alkapuri',
      ward: 'Ward 8 (West Zone)',
      coordinates: [22.3112, 73.1712],
    },
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    reportedBy: 'Kavita Sharma',
    reportedAt: '2 hours ago',
    upvotes: 54,
    commentsCount: 11,
    description:
      'Large deep craters have formed near the busy traffic roundabout after the recent rains. Two-wheelers are skidding and traffic is heavily backed up during evening peak hours.',
    images: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Yesterday, 09:30 AM', note: 'Citizen complaint logged with GPS location' },
      { status: 'IN_REVIEW', date: 'Yesterday, 02:15 PM', note: 'Verified by West Zone Road Inspector' },
      { status: 'IN_PROGRESS', date: 'Today, 10:00 AM', note: 'Asphalt patching squad mobilized with cold-mix machinery' },
    ],
  },
  {
    id: 'FMA-1043',
    title: 'Overflowing commercial waste containers near Railway Underpass',
    category: 'garbage',
    categoryLabel: 'Garbage & Sanitation',
    location: {
      address: 'Near Dairy Den Circle & Railway Station South Gate, Sayajigunj',
      area: 'Sayajigunj',
      ward: 'Ward 7 (Central Zone)',
      coordinates: [22.3129, 73.1878],
    },
    status: 'SUBMITTED',
    priority: 'MEDIUM',
    reportedBy: 'Parth Patel',
    reportedAt: '4 hours ago',
    upvotes: 32,
    commentsCount: 5,
    description:
      'Community dumpsters have been overflowing for 3 days. Stray animals and waste are spilling across the pedestrian footpath.',
    images: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Today, 02:00 PM', note: 'Complaint filed by neighborhood shopkeepers' },
    ],
  },
  {
    id: 'FMA-1044',
    title: 'Water distribution line burst causing flooding on Akota Main Road',
    category: 'water-leakage',
    categoryLabel: 'Water & Drainage',
    location: {
      address: 'Near Akota Bridge Approach Road, Adjacent to Old Padra Road turn',
      area: 'Akota',
      ward: 'Ward 9 (West Zone)',
      coordinates: [22.2991, 73.1672],
    },
    status: 'IN_REVIEW',
    priority: 'URGENT',
    reportedBy: 'Nirav Shah',
    reportedAt: '6 hours ago',
    upvotes: 89,
    commentsCount: 16,
    description:
      'Underground potable water supply pipeline has ruptured. Clean drinking water is gushing out on the road causing massive water loss and sub-surface hollows.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Today, 08:15 AM', note: 'Urgent leak alert registered' },
      { status: 'IN_REVIEW', date: 'Today, 11:30 AM', note: 'Assigned to Municipal Water Supply Department' },
    ],
  },
  {
    id: 'FMA-1045',
    title: 'Damaged storm drain cover open on Karelibaug Water Tank road',
    category: 'infrastructure',
    categoryLabel: 'Public Infrastructure',
    location: {
      address: 'Opposite Amrapali Complex, Near Karelibaug Water Tank',
      area: 'Karelibaug',
      ward: 'Ward 4 (North Zone)',
      coordinates: [22.3228, 73.2045],
    },
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    reportedBy: 'Bhavna Joshi',
    reportedAt: '1 day ago',
    upvotes: 47,
    commentsCount: 8,
    description:
      'Reinforced concrete slab over the stormwater canal has broken off completely, creating a 4-foot deep hazard right next to the pedestrian walkway.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Yesterday, 08:00 AM', note: 'Hazard reported with photos' },
      { status: 'IN_REVIEW', date: 'Yesterday, 12:00 PM', note: 'Barricaded by local ward supervisor' },
      { status: 'IN_PROGRESS', date: 'Today, 09:00 AM', note: 'Precast slab casting and replacement underway' },
    ],
  },
  {
    id: 'FMA-1046',
    title: 'Four high-mast streetlights non-functional near Fatehgunj Flyover',
    category: 'streetlights',
    categoryLabel: 'Broken Streetlights',
    location: {
      address: 'Fatehgunj Circle, Below Flyover Near MSU Polytechnic',
      area: 'Fatehgunj',
      ward: 'Ward 5 (North Zone)',
      coordinates: [22.3255, 73.1882],
    },
    status: 'RESOLVED',
    priority: 'MEDIUM',
    reportedBy: 'Anand Mehta',
    reportedAt: '2 days ago',
    upvotes: 62,
    commentsCount: 9,
    description:
      'Complete darkness under the flyover after 7:30 PM creating safety concerns for students and commuters crossing towards the transit hub.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Nov 13, 07:00 PM', note: 'Complaint logged' },
      { status: 'IN_REVIEW', date: 'Nov 14, 09:30 AM', note: 'Verified by Streetlight Maintenance Division' },
      { status: 'IN_PROGRESS', date: 'Nov 14, 03:00 PM', note: 'Timer circuit replaced and LED floodlights restored' },
      { status: 'RESOLVED', date: 'Nov 15, 10:00 AM', note: 'Night inspection confirmed 100% operational' },
    ],
  },
  {
    id: 'FMA-1047',
    title: 'Broken paver blocks and pedestrian footpath obstruction on Gotri Road',
    category: 'infrastructure',
    categoryLabel: 'Public Infrastructure',
    location: {
      address: 'Near Medical College & Hospital Gate, Gotri Road',
      area: 'Gotri',
      ward: 'Ward 10 (West Zone)',
      coordinates: [22.3195, 73.1425],
    },
    status: 'IN_REVIEW',
    priority: 'MEDIUM',
    reportedBy: 'Dr. Hardik Desai',
    reportedAt: '8 hours ago',
    upvotes: 38,
    commentsCount: 4,
    description:
      'Footpath paver blocks dug up during utility cable laying 2 weeks ago and left open. Pedestrians and hospital visitors are forced onto active roadway.',
    images: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Today, 10:30 AM', note: 'Complaint submitted by hospital staff' },
      { status: 'IN_REVIEW', date: 'Today, 02:45 PM', note: 'Notice issued to utility contractor' },
    ],
  },
  {
    id: 'FMA-1048',
    title: 'Drainage line choking and sewage backflow in Old City market lane',
    category: 'water-leakage',
    categoryLabel: 'Water & Drainage',
    location: {
      address: 'Near Mandvi Gate, Ghee Kanta Road, Old City',
      area: 'Mandvi / Old City',
      ward: 'Ward 1 (East Zone)',
      coordinates: [22.2998, 73.2104],
    },
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    reportedBy: 'Ibrahim Memon',
    reportedAt: '12 hours ago',
    upvotes: 75,
    commentsCount: 14,
    description:
      'Underground sewer line choked up, spilling dark foul-smelling wastewater into historic bazaar lane.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Today, 06:00 AM', note: 'Emergency sanitation report filed' },
      { status: 'IN_PROGRESS', date: 'Today, 11:00 AM', note: 'Jetting machine active at Mandvi Gate' },
    ],
  },
  {
    id: 'FMA-1049',
    title: 'Flickering streetlights and dangling wire near Darbar Chowkadi',
    category: 'streetlights',
    categoryLabel: 'Broken Streetlights',
    location: {
      address: 'Darbar Chowkadi, Near Eva Mall, Manjalpur',
      area: 'Manjalpur',
      ward: 'Ward 14 (South Zone)',
      coordinates: [22.2690, 73.1965],
    },
    status: 'SUBMITTED',
    priority: 'HIGH',
    reportedBy: 'Pooja Trivedi',
    reportedAt: '3 hours ago',
    upvotes: 29,
    commentsCount: 3,
    description:
      'Electric wire hanging loose from streetlight pole near children playground at Darbar Chowkadi, posing hazard.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    ],
    timeline: [
      { status: 'SUBMITTED', date: 'Today, 03:30 PM', note: 'Hazard registered by residential society' },
    ],
  },
];
