import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Video } from '../models/video';
import { HistoryService } from './history.service';
import { BookmarkService } from './bookmark.service';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private historyService: HistoryService,
    private bookmarkService: BookmarkService
  ) {
    // Initialize by loading data from API
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getHistory().subscribe(
      videos => {
        // Update local history service with data from API
        videos.forEach(video => this.historyService.addToHistory(video));
      },
      error => console.error('Error loading history from API:', error)
    );

    this.getBookmarks().subscribe(
      videos => {
        // Update local bookmark service with data from API
        videos.forEach(video => this.bookmarkService.addBookmark(video));
      },
      error => console.error('Error loading bookmarks from API:', error)
    );
  }

  // History methods
  getHistory(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/history`);
  }

  addToHistory(video: Video): Observable<Video> {
    // First update the backend
    return this.http.post<Video>(`${this.apiUrl}/history`, video)
      .pipe(
        tap(
          // On success, update the local service
          savedVideo => this.historyService.addToHistory(savedVideo),
          error => console.error('Error adding to history:', error)
        )
      );
  }

  // Bookmark methods
  getBookmarks(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/bookmarks`);
  }

  addToBookmarks(video: Video): Observable<Video> {
    // First update the backend
    return this.http.post<Video>(`${this.apiUrl}/bookmarks`, video)
      .pipe(
        tap(
          // On success, update the local service
          savedVideo => this.bookmarkService.addBookmark(savedVideo),
          error => console.error('Error adding to bookmarks:', error)
        )
      );
  }

  // Method to sync local storage with backend (useful after offline usage)
  syncWithBackend(): void {
    // Sync history
    const localHistory = this.historyService.getHistory();
    localHistory.forEach(video => {
      this.http.post<Video>(`${this.apiUrl}/history`, video).subscribe();
    });

    // Sync bookmarks
    const localBookmarks = this.bookmarkService.getBookmarks();
    localBookmarks.forEach(video => {
      this.http.post<Video>(`${this.apiUrl}/bookmarks`, video).subscribe();
    });
  }
}