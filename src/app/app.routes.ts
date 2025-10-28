import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { ApplicantRegistration } from './pages/applicant-registration/applicant-registration';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Homepage },
  { path: 'register', component: ApplicantRegistration },
  { path: '**', redirectTo: '/home' }
];