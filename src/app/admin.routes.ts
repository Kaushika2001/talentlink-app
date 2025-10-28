// src/app/admin.routes.ts

import { Routes } from '@angular/router';
import { adminAuthGuard } from './admin/guards/admin-auth.guard';

// Layout
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// Member 1's Pages (Dashboard)
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

// Member 2's Pages (Job Management)
import { JobManagementComponent } from './pages/job-management/job-management.component';
import { JobFormComponent } from './pages/job-form/job-form.component';

// Member 3's Pages (Course Management)
import { CourseLibraryComponent } from './pages/course-library/course-library.component';
import { CourseBuilderComponent } from './pages/course-builder/course-builder.component';

// You will also import Member 1 (Dashboard) and Member 4 (Applicant/Employee) components here

export const routes: Routes = [
  {
    // This is the main layout for the entire Admin Portal
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      // Default route for the admin section
      // Redirect to dashboard by default
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 

  // --- Member 1's Routes ---
  { path: 'dashboard', component: AdminDashboardComponent },
      
      // --- Member 2's Routes ---
      { path: 'jobs', component: JobManagementComponent },
      { path: 'jobs/new', component: JobFormComponent },
      { path: 'jobs/edit/:id', component: JobFormComponent },
      
      // --- Member 3's Routes (Merged) ---
      { path: 'courses', component: CourseLibraryComponent },
      { path: 'courses/create', component: CourseBuilderComponent },
      { path: 'courses/edit/:id', component: CourseBuilderComponent },

      // --- Member 1 & 4 Routes will go here too ---
      // { path: 'dashboard', component: AdminDashboardComponent },
      // { path: 'applicants', component: ApplicantManagementComponent },
      // { path: 'employees', component: EmployeeManagementComponent },
    ],
  },
];