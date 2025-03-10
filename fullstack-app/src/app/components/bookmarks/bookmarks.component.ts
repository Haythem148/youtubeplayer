import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../services/bookmark.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { VideoApiService } from '../../services/video-api.services';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks: Video[] = [];
  showBookmarks = false;

  constructor(
    private bookmarkService: BookmarkService,
    private videoService: VideoService,
    private videoApiService: VideoApiService
  ) {}

  ngOnInit(): void {
    this.videoApiService.getBookmarks().subscribe(
      videos => {
        // Any additional logic with the videos from API
      },
      error => console.error('Error loading bookmarks:', error)
    );
    
    this.bookmarkService.bookmarks$.subscribe(videos => {
      this.bookmarks = videos;
    });
  }

  loadVideo(video: Video): void {
    this.videoService.setCurrentVideo(video);
  }

  removeBookmark(event: Event, videoId: string): void {
    event.stopPropagation();
    this.bookmarkService.removeBookmark(videoId);
  }

  toggleBookmarks(): void {
    this.showBookmarks = !this.showBookmarks;
  }
}
