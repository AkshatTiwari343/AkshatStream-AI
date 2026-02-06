
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { VideoGrid } from './components/VideoGrid';
import { VideoPlayer } from './components/VideoPlayer';
import { AIStudio } from './components/AIStudio';
import { AIAssistant } from './components/AIAssistant';
import { AppView, Video } from './types';
import { storageService } from './services/storageService';

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Cyberpunk Cityscape: 2099',
    thumbnail: 'https://picsum.photos/seed/cyber/800/450',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '10:04',
    views: '1.2M',
    creator: 'NeonArch',
    category: 'Sci-Fi',
    description: 'A deep dive into the neon-lit streets of Neo-Tokyo in the year 2099.'
  },
  {
    id: '2',
    title: 'Mountain Retreat: Cinematic 4K',
    thumbnail: 'https://picsum.photos/seed/mountain/800/450',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '12:35',
    views: '850K',
    creator: 'NatureVibe',
    category: 'Nature',
    description: 'Breathtaking views from the highest peaks in the Himalayas.'
  },
  {
    id: '3',
    title: 'Minimalist Architecture Design',
    thumbnail: 'https://picsum.photos/seed/arch/800/450',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '08:20',
    views: '420K',
    creator: 'StudioAlpha',
    category: 'Design',
    description: 'Exploring the beauty of modern minimalist structures across Europe.'
  },
  {
    id: '4',
    title: 'Future Tech Expo 2025',
    thumbnail: 'https://picsum.photos/seed/tech/800/450',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '15:45',
    views: '2.5M',
    creator: 'TechDaily',
    category: 'Technology',
    description: 'Everything you missed at the biggest tech event of the decade.'
  },
  {
    id: '5',
    title: 'The Art of Coffee Roasting',
    thumbnail: 'https://picsum.photos/seed/coffee/800/450',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '05:12',
    views: '150K',
    creator: 'BeanMaster',
    category: 'Lifestyle',
    description: 'Mastering the roast to get that perfect cup of specialty coffee.'
  },
  {
    id: '6',
    title: 'Deep Ocean Exploration',
    thumbnail: 'https://picsum.photos/seed/ocean/800/450',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '22:10',
    views: '1.1M',
    creator: 'AbyssExplorer',
    category: 'Science',
    description: 'Descending into the Mariana Trench to discover alien-like lifeforms.'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userVideos, setUserVideos] = useState<Video[]>([]);

  useEffect(() => {
    setUserVideos(storageService.getVideos());
  }, [currentView]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setCurrentView(AppView.PLAYING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allAvailableVideos = [...userVideos, ...MOCK_VIDEOS];

  const filteredVideos = allAvailableVideos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={() => setCurrentView(AppView.HOME)}
        currentView={currentView}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          setView={setCurrentView} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {currentView === AppView.HOME && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Recommended</h1>
              <VideoGrid videos={filteredVideos} onVideoClick={handleVideoSelect} />
            </div>
          )}

          {currentView === AppView.PLAYING && selectedVideo && (
            <VideoPlayer video={selectedVideo} onBack={() => setCurrentView(AppView.HOME)} />
          )}

          {currentView === AppView.STUDIO && (
            <AIStudio onSave={(v) => {
              storageService.saveVideo(v);
              setUserVideos(storageService.getVideos());
            }} />
          )}

          {currentView === AppView.LIBRARY && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Library</h1>
              <p className="text-slate-500 mb-8">Personal collection of AI generations and saved content.</p>
              {userVideos.length > 0 ? (
                <VideoGrid videos={userVideos} onVideoClick={handleVideoSelect} />
              ) : (
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Library is Empty</h3>
                  <p className="text-slate-500 mb-6">Create your first cinematic video in the AI Studio!</p>
                  <button onClick={() => setCurrentView(AppView.STUDIO)} className="bg-indigo-600 px-6 py-2 rounded-xl font-bold">Go to Studio</button>
                </div>
              )}
            </div>
          )}

          {currentView === AppView.EXPLORE && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Explore</h1>
              <div className="flex overflow-x-auto gap-3 mb-6 md:mb-8 pb-2 no-scrollbar">
                {['Sci-Fi', 'Nature', 'Design', 'Technology', 'Lifestyle', 'Science'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSearchQuery(cat)}
                    className={`px-5 py-2 whitespace-nowrap rounded-full text-xs md:text-sm font-medium transition-colors border ${
                      searchQuery === cat 
                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <VideoGrid videos={filteredVideos} onVideoClick={handleVideoSelect} />
            </div>
          )}
        </main>
      </div>

      <AIAssistant />
      <MobileNav currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

export default App;
