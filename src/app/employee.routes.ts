// src/app/employee.routes.ts
import { Routes } from '@angular/router';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ProfileSkillsComponent } from './pages/profile-skills/profile-skills.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'profile', component: ProfileSkillsComponent },
    ],
  },
];
