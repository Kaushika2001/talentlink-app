// src/app/applicant.routes.ts
import { Routes } from '@angular/router';
import { ApplicantLayoutComponent } from './layouts/applicant-layout/applicant-layout.component';
import { ModulePageComponent } from './components/module-page/module-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { ApplicantLoginComponent } from './pages/applicant-login/applicant-login.component';
import { ApplicantRegistration } from './pages/applicant-registration/applicant-registration';

export const routes: Routes = [
	// Applicant Login & Registration (no layout)
	{ path: 'login', component: ApplicantLoginComponent },
	{ path: 'register', component: ApplicantRegistration },
	
	// Applicant Portal (with layout)
	{
		path: '',
		component: ApplicantLayoutComponent,
		children: [
			{ path: '', redirectTo: 'modules', pathMatch: 'full' },
			{ path: 'modules', component: ModulePageComponent },
			{ path: 'quiz', component: QuizPageComponent },
		],
	},
];
