import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { VideoApiService } from './video-api.services';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private onlineStatusSubject = new BehaviorSubject<boolean>(navigator.onLine);
  public onlineStatus$ = this.onlineStatusSubject.asObservable();

  constructor(private videoApiService: VideoApiService) {
    // Initialize online status
    this.onlineStatusSubject.next(navigator.onLine);

    // Listen for online/offline events
    fromEvent(window, 'online').subscribe(() => {
      this.onlineStatusSubject.next(true);
      this.handleOnlineStatusChange(true);
    });

    fromEvent(window, 'offline').subscribe(() => {
      this.onlineStatusSubject.next(false);
      this.handleOnlineStatusChange(false);
    });
  }

  private handleOnlineStatusChange(isOnline: boolean): void {
    if (isOnline) {
      // When coming back online, sync local data with backend
      this.videoApiService.syncWithBackend();
    }
  }

  public isOnline(): boolean {
    return navigator.onLine;
  }
} 