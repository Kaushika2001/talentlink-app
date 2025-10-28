import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-admin-nav',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-nav.component.html'
})
export class AdminNavComponent {
    private adminService = inject(AdminService);
    private router = inject(Router);

    currentUser = this.adminService.getCurrentUser();

    navItems = [
        { label: 'Dashboard', icon: '📊', route: '/admin/dashboard' },
        { label: 'Applicants', icon: '👥', route: '/admin/applicants' },
        { label: 'Job Postings', icon: '💼', route: '/admin/jobs' },
        { label: 'Analytics', icon: '📈', route: '/admin/analytics' },
        { label: 'Settings', icon: '⚙️', route: '/admin/settings' }
    ];

    onLogout(): void {
        this.adminService.logout();
    }
}
