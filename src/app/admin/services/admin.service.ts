import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: 'super-admin' | 'hr-admin' | 'manager';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    user?: AdminUser;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private currentUser = signal<AdminUser | null>(null);
    private isAuthenticated = signal<boolean>(false);
    private router = inject(Router);

    constructor() {
        this.checkAuthStatus();
    }

    /**
     * Check if user is already logged in (on app initialization)
     */
    private checkAuthStatus(): void {
        const token = localStorage.getItem('adminToken');
        const userJson = localStorage.getItem('adminUser');

        if (token && userJson) {
            try {
                const user = JSON.parse(userJson) as AdminUser;
                this.currentUser.set(user);
                this.isAuthenticated.set(true);
            } catch (error) {
                // Clear invalid data
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            }
        }
    }

    /**
     * Login method
     */
    login(credentials: LoginCredentials): Observable<LoginResponse> {
        // Mock authentication - replace with actual API call
        return of({
            email: credentials.email,
            password: credentials.password
        }).pipe(
            delay(1000), // Simulate network delay
            map(() => {
                // Mock validation
                if (credentials.email === 'admin@talentlink.com' && credentials.password === 'admin123') {
                    const user: AdminUser = {
                        id: '1',
                        email: credentials.email,
                        name: 'Admin User',
                        role: 'super-admin'
                    };

                    const token = this.generateMockToken();

                    // Store in localStorage
                    localStorage.setItem('adminToken', token);
                    localStorage.setItem('adminUser', JSON.stringify(user));

                    // Update signals
                    this.currentUser.set(user);
                    this.isAuthenticated.set(true);

                    return {
                        success: true,
                        token,
                        user
                    };
                } else {
                    throw new Error('Invalid credentials');
                }
            })
        );
    }

    /**
     * Logout method
     */
    logout(): void {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser.asReadonly();
    }

    /**
     * Check if authenticated
     */
    getAuthStatus() {
        return this.isAuthenticated.asReadonly();
    }

    /**
     * Get auth token
     */
    getToken(): string | null {
        return localStorage.getItem('adminToken');
    }

    /**
     * Check if user has specific role
     */
    hasRole(role: AdminUser['role']): boolean {
        const user = this.currentUser();
        return user?.role === role;
    }

    /**
     * Generate mock JWT token
     */
    private generateMockToken(): string {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: '1',
            email: 'admin@talentlink.com',
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));
        const signature = btoa('mock-signature');
        return `${header}.${payload}.${signature}`;
    }

    /**
     * Validate token (mock implementation)
     */
    validateToken(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;

            const payload = JSON.parse(atob(parts[1]));
            const now = Date.now();

            // Check if token is expired
            return payload.exp > now;
        } catch {
            return false;
        }
    }
}
