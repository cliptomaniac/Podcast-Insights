
import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start" role="alert">
      <ExclamationTriangleIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};
