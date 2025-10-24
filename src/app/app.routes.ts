import { Routes } from '@angular/router';
import { JobManagementComponent } from './pages/job-management/job-management.component';
import { JobFormComponent } from './pages/job-form/job-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobManagementComponent },
  { path: 'jobs/new', component: JobFormComponent },
  { path: 'jobs/edit/:id', component: JobFormComponent },
];
