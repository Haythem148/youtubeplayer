import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../services/video.service';
import { BookmarkService } from '../../services/bookmark.service';
import { Video } from '../../models/video';
import { VideoApiService } from '../../services/video-api.services';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
  currentVideo: Video | null = null;
  safeUrl: SafeResourceUrl | null = null;
  isBookmarked = false;

  constructor(
    private videoService: VideoService,
    private bookmarkService: BookmarkService,
    private sanitizer: DomSanitizer,
    private videoApiService: VideoApiService
  ) {}

  ngOnInit(): void {
    this.videoService.currentVideo$.subscribe(video => {
      this.currentVideo = video;
      if (video) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${video.id}`
        );
        this.isBookmarked = this.bookmarkService.isBookmarked(video.id);
      } else {
        this.safeUrl = null;
      }
    });
  }
  formatDate(timestamp: string | Date): string {
    if (!timestamp) return 'Unknown date';
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleDateString();
  }
  
  playVideo(video: Video): void {
    // ... existing code ...
    
    // Add to history via API service
    this.videoApiService.addToHistory(video).subscribe(
      () => {
        // Video added to history successfully
        // Any additional logic after adding to history
      },
      error => console.error('Error adding video to history:', error)
    );
  }

  toggleBookmark(): void {
    if (!this.currentVideo) return;
    
    if (this.bookmarkService.isBookmarked(this.currentVideo.id)) {
      // If already bookmarked, just remove locally
      this.bookmarkService.removeBookmark(this.currentVideo.id);
      this.isBookmarked = false;
    } else {
      // Make sure the video has all required fields
      const videoToBookmark: Video = {
        id: this.currentVideo.id,
        title: this.currentVideo.title || `Video ${this.currentVideo.id}`,
        url: this.currentVideo.url
      };
      
      // Add to bookmarks via API service
      this.videoApiService.addToBookmarks(videoToBookmark).subscribe(
        () => {
          // Video bookmarked successfully
          this.isBookmarked = true;
        },
        error => {
          console.error('Error bookmarking video:', error);
          // If it's already bookmarked on the server but not locally, update local state
          if (error.status === 400 && error.error?.error?.includes('already bookmarked')) {
            this.bookmarkService.addBookmark(videoToBookmark);
            this.isBookmarked = true;
          }
        }
      );
    }
  }
}
