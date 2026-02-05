import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeepaliveService } from './services/keepalive.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

import { InstallPromptComponent } from './components/install-prompt/install-prompt';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InstallPromptComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  constructor(
    private keepaliveService: KeepaliveService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only start the keepalive service in browser environment, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      // Start the keepalive service to ping the backend every 5 minutes
      this.keepaliveService.startKeepalive();
    }
  }
}