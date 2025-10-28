import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handle form submission
  onSubmit(): void {
    // Reset error message
    this.errorMessage = '';

    // Basic validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // In a real app, this would call an authentication service
    console.log('Login attempt:', { email: this.email, rememberMe: this.rememberMe });
    
    // Simulate successful login
    alert('Login successful!');
    this.router.navigate(['/employee/dashboard']);
  }

  // Navigate to forgot password
  forgotPassword(): void {
    // In a real app, this would navigate to forgot password page
    alert('Password reset link would be sent to your email');
  }
}
