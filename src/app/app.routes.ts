// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

export const routes: Routes = [
  // Root should load the common login page (no /admin prefix)
  { path: '', component: AdminLoginComponent },
  // Optional alias for direct /login
  { path: 'login', component: AdminLoginComponent },
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