// src/app/employee.routes.ts
import { Routes } from '@angular/router';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ProfileSkillsComponent } from './pages/profile-skills/profile-skills.component';
import { EmployeeCourseLibraryComponent } from './pages/employee-course-library/employee-course-library.component';
import { MyLearningComponent } from './pages/my-learning/my-learning.component';
import { EmployeeLoginComponent } from './pages/employee-login/employee-login.component';

export const routes: Routes = [
  // Employee Login (no layout)
  { path: 'login', component: EmployeeLoginComponent },
  
  // Employee Portal (with layout)
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'profile', component: ProfileSkillsComponent },
      { path: 'courses', component: EmployeeCourseLibraryComponent },
      { path: 'my-learning', component: MyLearningComponent },
    ],
  },
];
