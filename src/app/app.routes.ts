import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ADMIN PORTAL (Members 1-4)
    // This loads the merged route file you just created
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.routes)
    // This tells Angular: "When a user goes to /admin, load the AdminLayout
    // and all its children (jobs, courses, etc.)"
  },
  
  {
    // EXTERNAL PORTAL (Members 5-8, 10)
    // This will have its own layout and routes
    path: '', 
    loadChildren: () => import('./external/external.routes').then(m => m.routes)
    // This makes 'www.yoursite.com' the external homepage
  },

  {
    // INTERNAL PORTAL (Members 8-10)
    // This will have its own layout and routes
    path: 'portal', 
    loadChildren: () => import('./internal/internal.routes').then(m => m.routes)
    // This makes 'www.yoursite.com/portal' the employee login/dashboard
  },
  
  // Add a 404 Not Found page
  // { path: '**', component: NotFoundComponent } 
];