import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { ROUTES } from '../utils/constants';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#FFF5CC] border border-[#FFD43B] flex items-center justify-center text-[#171717] font-extrabold text-2xl mx-auto shadow-sm">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-[#171717] font-heading">
            Area Not Found
          </h1>
          <p className="text-sm text-[#666666]">
            The civic page or complaint report you are looking for doesn't exist or has been relocated.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            to={ROUTES.HOME}
            variant="primary"
            size="md"
            leftIcon={Home}
          >
            Return Home
          </Button>
          <Button
            to={ROUTES.REPORTS}
            variant="secondary"
            size="md"
            leftIcon={ArrowLeft}
          >
            Browse Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
