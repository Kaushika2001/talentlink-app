import { Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { ApplicantManagementComponent } from './admin/applicant-management/applicant-management';
import { EmployeeManagementComponent } from './admin/employee-management/employee-management';

export const routes: Routes = [
  // Admin Portal Routes
  {
    path: 'admin',
    component: LayoutComponent, // This layout wraps all admin pages
    children: [
      { path: '', component: Dashboard }, // Default admin page
      { path: 'applicants', component: ApplicantManagementComponent }, // Your page
      { path: 'employees', component: EmployeeManagementComponent }   // Your page
    ]
  },

  // Redirect base URL to the admin portal
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  
  // Optional: A 404-not-found page
  // { path: '**', component: PageNotFoundComponent } 
];