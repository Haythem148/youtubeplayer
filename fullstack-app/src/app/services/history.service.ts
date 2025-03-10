import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Video } from '../models/video';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historySubject = new BehaviorSubject<Video[]>([]);
  history$ = this.historySubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedHistory = localStorage.getItem('videoHistory');
    if (storedHistory) {
      this.historySubject.next(JSON.parse(storedHistory));
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('videoHistory', JSON.stringify(this.historySubject.value));
  }

  addToHistory(video: Video): void {
    const currentHistory = this.historySubject.value;
    // Remove if already exists to avoid duplicates
    const filteredHistory = currentHistory.filter(v => v.id !== video.id);
    // Add to the beginning of the array
    const newHistory = [video, ...filteredHistory];
    this.historySubject.next(newHistory);
    this.saveToLocalStorage();
  }

  getHistory(): Video[] {
    return this.historySubject.value;
  }

  clearHistory(): void {
    this.historySubject.next([]);
    this.saveToLocalStorage();
  }
}
