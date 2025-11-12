
import React from 'react';
import { type InsightsOutput } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';

interface ResultsDisplayProps {
  insights: InsightsOutput;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ insights }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-sky-400 mb-2">{insights.title}</h2>
      <p className="text-slate-300 mb-6 italic border-l-4 border-slate-600 pl-4">{insights.summary}</p>
      
      <h3 className="text-xl font-semibold text-white mb-4">Aligned Action Points:</h3>
      <ul className="space-y-4 mb-8">
        {insights.actionPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <CheckCircleIcon className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span className="text-slate-300">{point}</span>
          </li>
        ))}
      </ul>

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
        <h4 className="flex items-center text-lg font-semibold text-amber-400 mb-2">
            <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
            Reflection Question
        </h4>
        <p className="text-slate-300">{insights.reflectionQuestion}</p>
      </div>
    </div>
  );
};
