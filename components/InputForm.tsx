
import React from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { TargetIcon } from './icons/TargetIcon';

interface InputFormProps {
  youtubeUrl: string;
  setYoutubeUrl: (value: string) => void;
  userGoal: string;
  setUserGoal: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  youtubeUrl,
  setYoutubeUrl,
  userGoal,
  setUserGoal,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-6">
      <div>
        <label htmlFor="youtubeUrl" className="flex items-center text-sm font-medium text-slate-300 mb-2">
          <LinkIcon className="w-4 h-4 mr-2 text-slate-400" />
          YouTube URL
        </label>
        <input
          type="url"
          id="youtubeUrl"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full bg-slate-900/70 border border-slate-600 rounded-md px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          required
        />
      </div>
      <div>
        <label htmlFor="userGoal" className="flex items-center text-sm font-medium text-slate-300 mb-2">
          <TargetIcon className="w-4 h-4 mr-2 text-slate-400" />
          Your Goal
        </label>
        <input
          type="text"
          id="userGoal"
          value={userGoal}
          onChange={(e) => setUserGoal(e.target.value)}
          placeholder="e.g., 'Improve my communication as a leader'"
          className="w-full bg-slate-900/70 border border-slate-600 rounded-md px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-sky-600 text-white font-semibold py-2.5 px-4 rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Insights'
        )}
      </button>
    </form>
  );
};
