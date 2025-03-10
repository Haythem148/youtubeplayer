import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.loadSavedTheme();
  }

  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    this.applyTheme(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = savedTheme ? JSON.parse(savedTheme) : prefersDark;
    
    this.darkModeSubject.next(darkMode);
    this.applyTheme(darkMode);
  }

  private applyTheme(darkMode: boolean): void {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
