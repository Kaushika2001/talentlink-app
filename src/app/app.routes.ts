// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ADMIN PORTAL (Members 1-4)
    path: 'admin',
    loadChildren: () => import('./admin.routes').then(m => m.routes)
  },
  
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