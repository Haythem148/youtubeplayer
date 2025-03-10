import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { VideoApiService } from '../../services/video-api.services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyItems: Video[] = [];

  constructor(
    private historyService: HistoryService,
    private videoService: VideoService,
    private videoApiService: VideoApiService
  ) {}

  ngOnInit(): void {
    this.videoApiService.getHistory().subscribe(
      videos => {
      },
      error => console.error('Error loading history:', error)
    );
    
    //Continue using the local history service for UI updates
    this.historyService.history$.subscribe(videos => {
      this.historyItems = videos;
    });
  }

  loadVideo(video: Video): void {
    this.videoService.setCurrentVideo(video);
  }

  clearHistory(): void {
    this.historyService.clearHistory();
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }
  
}
