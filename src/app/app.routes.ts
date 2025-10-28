// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { Homepage } from './pages/homepage/homepage';
import { ApplicantRegistration } from './pages/applicant-registration/applicant-registration';

export const routes: Routes = [
  // Base URL shows homepage
  { path: '', component: Homepage },
  { path: 'home', component: Homepage },
  // Login and Register
  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: ApplicantRegistration },
  {
    // APPLICANT PORTAL
    path: 'applicant',
    loadChildren: () => import('./applicant.routes').then(m => m.routes)
  },
  {
    // ADMIN PORTAL (Members 1-4)
    path: 'admin',
    loadChildren: () => import('./admin.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: 'admin/dashboard'
  }
  
  // --- The empty objects have been removed ---

  // You can add your other routes here later when they are ready
  // {
  //   path: '', 
  //   loadChildren: () => import('./external/external.routes').then(m => m.routes)
  // },
  // {
  //   path: 'portal', 
  //   loadChildren: () => import('./internal/internal.routes').then(m => m.routes)
  // }
];