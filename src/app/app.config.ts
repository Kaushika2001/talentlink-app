// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // For the service

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // <-- Add this
    importProvidersFrom(FormsModule) // <-- Add this
  ]
};