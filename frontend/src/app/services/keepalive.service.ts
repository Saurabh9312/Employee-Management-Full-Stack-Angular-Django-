import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeepaliveService {
  private keepaliveInterval: number = 5 * 60 * 1000; // 5 minutes in milliseconds
  private intervalSubscription?: Subscription;
  private isKeepaliveActive: boolean = false;
  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  startKeepalive(): void {
    if (this.isKeepaliveActive) {
      console.log('Keepalive service is already active');
      return;
    }

    console.log('Starting keepalive service, calling backend every 5 minutes');
    this.isKeepaliveActive = true;

    // Create an interval that emits every 5 minutes
    this.intervalSubscription = interval(this.keepaliveInterval).subscribe(() => {
      this.pingBackend();
    });

    // Call immediately when starting
    this.pingBackend();
  }

  stopKeepalive(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.isKeepaliveActive = false;
      console.log('Keepalive service stopped');
    }
  }

  private pingBackend(): void {
    console.log('Pinging backend to keep it alive...');
    
    this.http.get(`${this.apiurl}/health-check`).pipe(
      catchError(error => {
        // If health-check endpoint doesn't exist, try a basic endpoint
        console.warn('Health check failed, trying employees endpoint as fallback:', error);
        return this.http.get(`${this.apiurl}/employees/`);
      })
    ).subscribe({
      next: (response) => {
        console.log('Backend ping successful:', new Date().toISOString());
      },
      error: (error) => {
        console.error('Backend ping failed:', error);
      }
    });
  }
}