
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: string;
  creator: string;
  description: string;
  category: string;
  aiInsights?: string;
  isUserGenerated?: boolean;
  createdAt?: number;
}

export enum AppView {
  HOME = 'home',
  PLAYING = 'playing',
  STUDIO = 'studio',
  EXPLORE = 'explore',
  LIBRARY = 'library'
}

export interface GenerationState {
  isGenerating: boolean;
  status: string;
  videoUrl?: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  links?: { title: string; uri: string }[];
}
