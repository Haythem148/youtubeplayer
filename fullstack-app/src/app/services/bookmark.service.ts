import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Video } from '../models/video';
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarksSubject = new BehaviorSubject<Video[]>([]);
  bookmarks$ = this.bookmarksSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedBookmarks = localStorage.getItem('videoBookmarks');
    if (storedBookmarks) {
      this.bookmarksSubject.next(JSON.parse(storedBookmarks));
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('videoBookmarks', JSON.stringify(this.bookmarksSubject.value));
  }

  addBookmark(video: Video): void {
    const currentBookmarks = this.bookmarksSubject.value;
    // Check if already bookmarked
    if (!currentBookmarks.some(v => v.id === video.id)) {
      const newBookmarks = [...currentBookmarks, video];
      this.bookmarksSubject.next(newBookmarks);
      this.saveToLocalStorage();
    }
  }

  removeBookmark(videoId: string): void {
    const currentBookmarks = this.bookmarksSubject.value;
    const newBookmarks = currentBookmarks.filter(v => v.id !== videoId);
    this.bookmarksSubject.next(newBookmarks);
    this.saveToLocalStorage();
  }

  isBookmarked(videoId: string): boolean {
    return this.bookmarksSubject.value.some(v => v.id === videoId);
  }

  getBookmarks(): Video[] {
    return this.bookmarksSubject.value;
  }

  getBookmarkCount(): number {
    return this.bookmarksSubject.value.length;
  }
}
