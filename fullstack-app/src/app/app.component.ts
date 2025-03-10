import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './services/bookmark.service';
import { ThemeService } from './services/ThemeService';
import { ConnectivityService } from './services/connectivity.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fullstack-app';
  bookmarkCount = 0;
  isOnline = true;
  
  constructor(
    private bookmarkService: BookmarkService, 
    public themeService: ThemeService,
    private connectivityService: ConnectivityService
  ) {}
  
  ngOnInit(): void {
    this.bookmarkService.bookmarks$.subscribe(bookmarks => {
      this.bookmarkCount = bookmarks.length;
    });
    this.connectivityService.onlineStatus$.subscribe(status => {
      this.isOnline = status;
    });
  }

  loadFeaturedVideo(videoId: string): void {
    // Implement the logic to load the featured video
    console.log(`Loading featured video: ${videoId}`);
    // You might want to navigate to the video or update the current video
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

 
}
