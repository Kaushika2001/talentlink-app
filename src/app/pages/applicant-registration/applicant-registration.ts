import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applicant-registration',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './applicant-registration.html',
  styleUrl: './applicant-registration.css'
})
export class ApplicantRegistration implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  isSubmitting = false;
  registrationSuccess = false;
  jobId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'] || null;
    });

    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isSubmitting = true;

    const registrationData = {
      ...this.registrationForm.value,
      jobId: this.jobId
    };

    console.log('Registration Data:', registrationData);

    setTimeout(() => {
      this.isSubmitting = false;
      this.registrationSuccess = true;

      setTimeout(() => {
        alert('Registration successful! You can now login.');
        this.router.navigate(['/home']);
      }, 2000);
    }, 2000);
  }

  resetForm(): void {
    this.submitted = false;
    this.registrationForm.reset();
  }
}