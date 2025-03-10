import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private currentVideoSubject = new BehaviorSubject<Video | null>(null);
  currentVideo$ = this.currentVideoSubject.asObservable();

  constructor() { }

  setCurrentVideo(video: Video): void {
    this.currentVideoSubject.next(video);
  }

  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  createVideoObject(url: string): Video | null {
    const videoId = this.extractVideoId(url);
    if (!videoId) return null;
    
    return {
      id: videoId,
      url: url,
      timestamp: Date.now()
    };
  }
}
