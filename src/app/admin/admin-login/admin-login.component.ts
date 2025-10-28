import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
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

        this.adminService.login({
            email: this.email(),
            password: this.password()
        }).subscribe({
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
