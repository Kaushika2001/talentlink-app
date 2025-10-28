import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AdminService } from '../services/admin.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
    const adminService = inject(AdminService);
    const router = inject(Router);

    const isAuthenticated = adminService.getAuthStatus()();
    const hasValidToken = adminService.validateToken();

    if (isAuthenticated && hasValidToken) {
        return true;
    }

    // Redirect to login page
    return router.createUrlTree(['/admin/login'], {
        queryParams: { returnUrl: state.url }
    });
};
