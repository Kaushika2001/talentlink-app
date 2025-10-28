import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent implements OnInit {
    email = signal('');
    password = signal('');
    errorMessage = signal('');
    isLoading = signal(false);
    returnUrl = signal('/admin/dashboard');

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private adminService: AdminService
    ) { }

    ngOnInit() {
          // Get return URL from route parameters or default to dashboard
          this.returnUrl.set(this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard');
    }

    onLogin() {
        this.errorMessage.set('');

        if (!this.email() || !this.password()) {
            this.errorMessage.set('Please enter both email and password');
            return;
        }

        this.isLoading.set(true);
        // Support applicant credentials as well
        const email = this.email().trim().toLowerCase();
        const password = this.password();

        if (email === 'applicant@talentlink.com' && password === 'applicant123') {
            // Mock applicant session
            const token = btoa('applicant-mock-token');
            const user = { id: 'a1', email, name: 'Applicant User', role: 'applicant' } as any;
            localStorage.setItem('applicantToken', token);
            localStorage.setItem('applicantUser', JSON.stringify(user));
            this.isLoading.set(false);
            this.router.navigate(['/applicant/modules']);
            return;
        }

        this.adminService
            .login({
                email: this.email(),
                password: this.password()
            })
            .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.router.navigate([this.returnUrl()]);
                    } else {
                        this.errorMessage.set(response.message || 'Login failed');
                    }
                    this.isLoading.set(false);
                },
                error: (error) => {
                    this.errorMessage.set(error.message || 'Invalid email or password');
                    this.isLoading.set(false);
                }
            });
    }

    onEmailChange(value: string) {
        this.email.set(value);
    }

    onPasswordChange(value: string) {
        this.password.set(value);
    }
}
