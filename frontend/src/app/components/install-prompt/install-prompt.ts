import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-install-prompt',
  imports: [],
  templateUrl: './install-prompt.html',
  styleUrl: './install-prompt.css',
})
export class InstallPromptComponent {
  deferredPrompt: any;
  showButton = signal(false);

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    this.showButton.set(true);
  }

  async installPwa() {
    this.showButton.set(false);
    if (!this.deferredPrompt) {
      return;
    }
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await this.deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    this.deferredPrompt = null;
  }
}
