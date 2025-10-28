import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

interface KPI {
    title: string;
    value: number;
    change: number;
    icon: string;
    color: string;
}

interface ActionItem {
    id: number;
    title: string;
    count: number;
    priority: 'high' | 'medium' | 'low';
    link: string;
}

interface FunnelStage {
    stage: string;
    count: number;
    percentage: number;
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
    kpis = signal<KPI[]>([]);
    funnelData = signal<FunnelStage[]>([]);
    actionItems = signal<ActionItem[]>([]);
    currentDate = signal('');
    adminName = signal('Admin User');

    constructor(
        private router: Router,
        private adminService: AdminService
    ) { }

    ngOnInit() {
        // Optional: route-level guard already protects this, but keep a safety check
        if (!this.adminService.getAuthStatus()()) {
            this.router.navigate(['/login']);
            return;
        }

        // Get current user info
        const user = this.adminService.getCurrentUser()();
        if (user) {
            this.adminName.set(user.name);
        }

        this.loadDashboardData();
        this.setCurrentDate();
    }

    loadDashboardData() {
        // Mock KPI data
        this.kpis.set([
            {
                title: 'New Certified Applicants',
                value: 24,
                change: 12,
                icon: 'users',
                color: 'blue'
            },
            {
                title: 'Jobs Posted',
                value: 18,
                change: 3,
                icon: 'briefcase',
                color: 'green'
            },
            {
                title: 'Active Employees in Training',
                value: 156,
                change: 8,
                icon: 'book',
                color: 'purple'
            },
            {
                title: 'Courses Completed This Month',
                value: 89,
                change: 15,
                icon: 'check-circle',
                color: 'yellow'
            }
        ]);

        // Mock Funnel data
        this.funnelData.set([
            { stage: 'Viewed Job Posting', count: 250, percentage: 100 },
            { stage: 'Started Training', count: 120, percentage: 48 },
            { stage: 'Passed Quiz', count: 85, percentage: 34 },
            { stage: 'Interviewed', count: 32, percentage: 13 },
            { stage: 'Hired', count: 12, percentage: 5 }
        ]);

        // Mock Action Items
        this.actionItems.set([
            {
                id: 1,
                title: 'Applicants ready for review',
                count: 5,
                priority: 'high',
                link: '/admin/applicants'
            },
            {
                id: 2,
                title: 'Pending course approvals',
                count: 3,
                priority: 'medium',
                link: '/admin/courses'
            },
            {
                id: 3,
                title: 'Employee certifications expiring',
                count: 8,
                priority: 'medium',
                link: '/admin/employees'
            },
            {
                id: 4,
                title: 'Job postings to review',
                count: 2,
                priority: 'low',
                link: '/admin/jobs'
            }
        ]);
    }

    setCurrentDate() {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        this.currentDate.set(new Date().toLocaleDateString('en-US', options));
    }

    logout() {
        this.adminService.logout();
    }

    getPriorityColor(priority: string): string {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'yellow';
            case 'low': return 'blue';
            default: return 'gray';
        }
    }

    getKpiColorClass(color: string): string {
        switch (color) {
            case 'blue': return 'bg-primary';
            case 'green': return 'bg-green-500';
            case 'purple': return 'bg-primary-variant';
            case 'yellow': return 'bg-secondary';
            default: return 'bg-primary';
        }
    }
}
