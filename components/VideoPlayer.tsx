
import React, { useState, useEffect } from 'react';
import { Video } from '../types';
import { getSummarization } from '../services/geminiService';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBack }) => {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setIsLoadingInsight(true);
      const summary = await getSummarization(video);
      setAiInsight(summary);
      setIsLoadingInsight(false);
    };
    fetchInsight();
  }, [video]);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <video 
              src={video.url} 
              controls 
              autoPlay 
              className="w-full h-full"
              poster={video.thumbnail}
            />
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full overflow-hidden">
                  <img src={`https://picsum.photos/seed/${video.creator}/100/100`} alt={video.creator} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">{video.creator}</h3>
                  <p className="text-sm text-slate-400">2.4M subscribers</p>
                </div>
                <button className="ml-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.757c1.27 0 1.906 1.535 1.007 2.434l-3.333 3.333c-.39.39-1.024.39-1.414 0L11.684 12.434C10.784 11.535 11.42 10 12.69 10H14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10L10 21l-4-4 4-4" />
                  </svg>
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Download
                </button>
              </div>
            </div>

            <div className="mt-6 bg-slate-900/50 rounded-xl p-4">
              <div className="flex gap-4 text-sm font-semibold mb-2">
                <span>{video.views} views</span>
                <span className="text-slate-500">2 weeks ago</span>
                <span className="text-indigo-400">#{video.category}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {video.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold">AI Smart Summary</h2>
            </div>

            {isLoadingInsight ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="relative z-10">
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{aiInsight}"
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest flex items-center gap-2">
                    Generate Timestamp Insights
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest px-2">Up Next</h3>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className="w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img src={`https://picsum.photos/seed/rel${i}/400/225`} alt="related" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-[8px] font-bold rounded">10:00</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold line-clamp-2 text-slate-200 group-hover:text-indigo-400 transition-colors mb-1">
                    Exploring the unseen depths of {['Cyberpunk', 'Mountains', 'Forests', 'Design'][i-1]}
                  </h4>
                  <p className="text-[10px] text-slate-500 mb-0.5">Creator Name</p>
                  <p className="text-[10px] text-slate-500">1.2M views • 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
