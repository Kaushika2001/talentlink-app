import { Routes } from '@angular/router';
import { CourseLibraryComponent } from './pages/course-library/course-library.component';
import { CourseBuilderComponent } from './pages/course-builder/course-builder.component';

export const routes: Routes = [
  // Your existing routes...
  
  // Admin Course Management Routes
  { path: 'admin/courses', component: CourseLibraryComponent },
  { path: 'admin/courses/create', component: CourseBuilderComponent },
  { path: 'admin/courses/edit/:id', component: CourseBuilderComponent },
  

];