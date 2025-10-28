// src/app/applicant.routes.ts
import { Routes } from '@angular/router';
import { ApplicantLayoutComponent } from './layouts/applicant-layout/applicant-layout.component';
import { ModulePageComponent } from './components/module-page/module-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';

export const routes: Routes = [
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
