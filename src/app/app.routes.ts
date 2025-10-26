import { Router, RouterModule, Routes } from '@angular/router';
import { ModulePageComponent } from './components/module-page/module-page.component';
import { NgModule } from '@angular/core';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';


export const routes: Routes = [
    {path:'module', component: ModulePageComponent},
    { path: 'quiz', component: QuizPageComponent },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}