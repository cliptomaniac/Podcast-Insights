
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateInsights } from './services/geminiService';
import { type InsightsOutput } from './types';

const App: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [userGoal, setUserGoal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<InsightsOutput | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const handleSubmit = useCallback(async () => {
    if (!youtubeUrl || !userGoal) {
      setError('Please fill in both the YouTube URL and your goal.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);
    setShowWelcome(false);

    try {
      const result = await generateInsights(youtubeUrl, userGoal);
      setInsights(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [youtubeUrl, userGoal]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <Header />
        <main>
          <InputForm
            youtubeUrl={youtubeUrl}
            setYoutubeUrl={setYoutubeUrl}
            userGoal={userGoal}
            setUserGoal={setUserGoal}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="mt-8">
            {showWelcome && <WelcomeMessage />}
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {insights && <ResultsDisplay insights={insights} />}
          </div>
        </main>
      </div>
    </div>
  );
};

const WelcomeMessage: React.FC = () => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
    <h2 className="text-xl font-semibold text-sky-400 mb-2">Welcome to Podcast Insights AI</h2>
    <p className="text-slate-400">
      Paste a YouTube podcast link and define your goal to receive AI-powered actionable steps.
    </p>
  </div>
);

export default App;
