// src/app/pages/course-builder/course-builder.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Interfaces for our course structure
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface CourseModule {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'text';
  contentUrl?: string;
  duration?: number; // in minutes
  isCompleted?: boolean;
}

export interface Course {
  id?: number;
  title: string;
  description: string;
  modules: CourseModule[];
  quiz: QuizQuestion[];
  requiredPassingScore: number;
  status: 'Active' | 'Draft';
}

@Component({
  selector: 'app-course-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-builder.component.html',
  styleUrls: ['./course-builder.component.css']
})
export class CourseBuilderComponent implements OnInit {
  course: Course = {
    title: '',
    description: '',
    modules: [],
    quiz: [],
    requiredPassingScore: 70,
    status: 'Draft'
  };

  isEditMode: boolean = false;
  currentStep: number = 1;
  newModule: CourseModule = { id: 0, title: '', type: 'video' };
  newQuestion: QuizQuestion = { id: 0, question: '', options: ['', '', '', ''], correctAnswer: 0 };
  uploadedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isEditMode = true;
      this.loadCourse(parseInt(courseId));
    }
  }

  // In real app, this would call a service
  loadCourse(courseId: number): void {
    // Mock data for editing
    this.course = {
      id: courseId,
      title: 'Sample Course for Editing',
      description: 'This is a sample course description',
      modules: [
        { id: 1, title: 'Introduction Video', type: 'video', duration: 10 },
        { id: 2, title: 'Safety Guidelines PDF', type: 'pdf', duration: 15 }
      ],
      quiz: [
        { 
          id: 1, 
          question: 'What is GMP?', 
          options: ['Good Manufacturing Practice', 'General Medical Protocol', 'Good Medical Practice', 'General Manufacturing Process'], 
          correctAnswer: 0 
        }
      ],
      requiredPassingScore: 75,
      status: 'Draft'
    };
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = 'A' in ASCII
  }

   isNewQuestionValid(): boolean {
    return this.newQuestion.question.trim().length > 0 && 
           this.newQuestion.options.every(opt => opt.trim().length > 0);
  }


  // Step navigation
  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }

  // Module management
  addModule(): void {
    if (this.newModule.title.trim()) {
      const module: CourseModule = {
        ...this.newModule,
        id: this.course.modules.length + 1
      };
      this.course.modules.push(module);
      this.newModule = { id: 0, title: '', type: 'video' };
      this.uploadedFile = null;
    }
  }

  removeModule(moduleId: number): void {
    this.course.modules = this.course.modules.filter(m => m.id !== moduleId);
  }

  // Quiz management
  addQuestion(): void {
    if (this.newQuestion.question.trim() && this.newQuestion.options.every(opt => opt.trim())) {
      const question: QuizQuestion = {
        ...this.newQuestion,
        id: this.course.quiz.length + 1
      };
      this.course.quiz.push(question);
      this.newQuestion = { id: 0, question: '', options: ['', '', '', ''], correctAnswer: 0 };
    }
  }

  removeQuestion(questionId: number): void {
    this.course.quiz = this.course.quiz.filter(q => q.id !== questionId);
  }

  // File upload handling
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFile = file;
      this.newModule.contentUrl = file.name;
    }
  }

  // Save course
  saveCourse(): void {
    // In real app, this would call a service to save to backend
    console.log('Saving course:', this.course);
    
    // Show success message and redirect
    alert('Course saved successfully!');
    this.router.navigate(['/admin/courses']);
  }

  // Publish course
  publishCourse(): void {
    this.course.status = 'Active';
    this.saveCourse();
  }

  // Form validation
  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.course.title.trim().length > 0 && 
               this.course.description.trim().length > 0;
      case 2:
        return this.course.modules.length > 0;
      case 3:
        return this.course.quiz.length > 0;
      default:
        return false;
    }
  }
}