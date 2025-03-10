import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { HistoryService } from '../../services/history.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  urlInput = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/)
  ]);
  
  constructor(
    private videoService: VideoService,
    private historyService: HistoryService
  ) {}

  loadVideo(): void {
    if (this.urlInput.invalid) return;
    
    const url = this.urlInput.value || '';
    const video = this.videoService.createVideoObject(url);
    
    if (video) {
      this.videoService.setCurrentVideo(video);
      this.historyService.addToHistory(video);
      this.urlInput.reset();
    }
  }
}
