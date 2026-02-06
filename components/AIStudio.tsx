
import React, { useState, useEffect } from 'react';
import { generateVideoWithVeo } from '../services/geminiService';
import { GenerationState, Video } from '../types';

interface AIStudioProps {
  onSave?: (video: Video) => void;
}

const getAIStudioAPI = () => (window as any).aistudio;

export const AIStudio: React.FC<AIStudioProps> = ({ onSave }) => {
  const [prompt, setPrompt] = useState('');
  const [generation, setGeneration] = useState<GenerationState>({
    isGenerating: false,
    status: ''
  });
  const [apiKeySelected, setApiKeySelected] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      const aistudio = getAIStudioAPI();
      if (aistudio) {
        const hasKey = await aistudio.hasSelectedApiKey();
        setApiKeySelected(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleOpenKeySelector = async () => {
    const aistudio = getAIStudioAPI();
    if (aistudio) {
      await aistudio.openSelectKey();
      setApiKeySelected(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGeneration({ isGenerating: true, status: 'Initializing...' });
    
    try {
      const videoUrl = await generateVideoWithVeo(prompt, (status) => {
        setGeneration(prev => ({ ...prev, status }));
      });
      
      const newVideo: Video = {
        id: `user-${Date.now()}`,
        title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
        thumbnail: 'https://picsum.photos/seed/' + Math.random() + '/800/450',
        url: videoUrl,
        duration: '0:07',
        views: '0',
        creator: 'You',
        category: 'AI Generation',
        description: `AI Generated content: ${prompt}`,
        isUserGenerated: true,
        createdAt: Date.now()
      };

      setGeneration({ isGenerating: false, status: 'Complete!', videoUrl });
      if (onSave) onSave(newVideo);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setApiKeySelected(false);
      }
      setGeneration({ isGenerating: false, status: 'Error', error: 'Failed to generate video. Please try again.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-10 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
          AI Creation Studio
        </h1>
        <p className="text-slate-400 text-sm md:text-lg">
          Transform your imagination into cinematic clips using Gemini Veo 3.1.
        </p>
      </div>

      {!apiKeySelected ? (
        <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Connect Your Creator Key</h2>
          <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 max-w-md mx-auto">
            To use high-quality video generation, you need to select an API key from a paid GCP project. 
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline ml-1">Learn more about billing.</a>
          </p>
          <button 
            onClick={handleOpenKeySelector}
            className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all transform active:scale-95"
          >
            Select API Key
          </button>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the cinematic scene..."
              className="w-full h-48 md:h-40 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-6 text-base md:text-xl focus:outline-none focus:ring-4 focus:ring-indigo-600/20 transition-all resize-none placeholder:text-slate-700"
              disabled={generation.isGenerating}
            />
            <div className="md:absolute bottom-4 right-4 mt-4 md:mt-0">
              <button
                onClick={handleGenerate}
                disabled={generation.isGenerating || !prompt.trim()}
                className={`w-full md:w-auto px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
                  generation.isGenerating || !prompt.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95'
                }`}
              >
                {generation.isGenerating ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Video
                  </>
                )}
              </button>
            </div>
          </div>

          {generation.isGenerating && (
            <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center animate-pulse">
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin"></div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-indigo-400 mb-2">{generation.status}</h3>
              <p className="text-slate-500 text-xs md:text-sm">Masterpiece rendering in progress...</p>
            </div>
          )}

          {generation.videoUrl && !generation.isGenerating && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-indigo-500/5">
                <span className="text-[10px] md:text-sm font-bold text-indigo-400 uppercase tracking-widest px-2 py-1 bg-indigo-400/10 rounded">Veo 3.1 Fast Result</span>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest px-2 py-1 bg-emerald-400/10 rounded">Saved to Library</span>
                </div>
              </div>
              <video 
                src={generation.videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full aspect-video"
              />
              <div className="p-4 md:p-6">
                <p className="text-slate-400 italic text-sm md:text-base">"{prompt}"</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
