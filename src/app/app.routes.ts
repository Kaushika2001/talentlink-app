import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ProfileSkillsComponent } from './pages/profile-skills/profile-skills.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employee-dashboard', pathMatch: 'full' },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'profile-skills', component: ProfileSkillsComponent },
  { path: '**', redirectTo: 'employee-dashboard' }
];
