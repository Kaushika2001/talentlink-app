import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/admin/login',
        pathMatch: 'full'
    },
    {
        path: 'admin/login',
        loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
    },
    {
        path: 'admin/dashboard',
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
        path: '**',
        redirectTo: '/admin/login'
    }
];
