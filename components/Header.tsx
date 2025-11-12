
import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-3 mb-2">
        <LightbulbIcon className="w-8 h-8 text-amber-400" />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Podcast Insights AI
        </h1>
      </div>
      <p className="text-base sm:text-lg text-slate-400">
        Turn video podcasts into actionable wisdom.
      </p>
    </header>
  );
};
