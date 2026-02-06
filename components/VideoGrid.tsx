
import React from 'react';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoClick }) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <p className="text-xl">No videos found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="video-grid-layout">
      {videos.map((video) => (
        <div 
          key={video.id} 
          className="group cursor-pointer"
          onClick={() => onVideoClick(video)}
        >
          <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-bold rounded">
              {video.duration}
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-9 h-9 flex-shrink-0 bg-slate-800 rounded-full overflow-hidden">
              <img src={`https://picsum.photos/seed/${video.creator}/100/100`} alt={video.creator} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold leading-tight text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 mb-1">
                {video.title}
              </h3>
              <p className="text-xs text-slate-400 mb-0.5">{video.creator}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>{video.views} views</span>
                <span className="w-0.5 h-0.5 bg-slate-600 rounded-full"></span>
                <span>{video.category}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
