
import { Video } from "../types";

const STORAGE_KEY = 'novastream_user_videos';

export const storageService = {
  saveVideo: (video: Video): void => {
    const existing = storageService.getVideos();
    const updated = [video, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  getVideos: (): Video[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  deleteVideo: (id: string): void => {
    const existing = storageService.getVideos();
    const updated = existing.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};
