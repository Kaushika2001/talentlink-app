import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EnrolledCourse {
  id: number;
  title: string;
  description: string;
  progress: number; // 0-100
  status: 'in-progress' | 'completed';
  enrolledDate: Date;
  completedDate?: Date;
  modulesCompleted: number;
  totalModules: number;
  lastAccessed?: Date;
}

@Component({
  selector: 'app-my-learning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.css'
})
export class MyLearningComponent implements OnInit {
  activeTab: 'in-progress' | 'completed' = 'in-progress';

  enrolledCourses: EnrolledCourse[] = [
    {
      id: 1,
      title: 'Introduction to Pharmaceutical Safety',
      description: 'Learn the fundamental safety protocols and procedures required in pharmaceutical environments.',
      progress: 60,
      status: 'in-progress',
      enrolledDate: new Date('2024-10-01'),
      modulesCompleted: 3,
      totalModules: 5,
      lastAccessed: new Date('2024-10-25')
    },
    {
      id: 2,
      title: 'GMP Compliance Training',
      description: 'Comprehensive training on Good Manufacturing Practices for pharmaceutical staff.',
      progress: 25,
      status: 'in-progress',
      enrolledDate: new Date('2024-10-10'),
      modulesCompleted: 2,
      totalModules: 8,
      lastAccessed: new Date('2024-10-20')
    },
    {
      id: 3,
      title: 'Laboratory Safety Procedures',
      description: 'Comprehensive laboratory safety training for pharmaceutical researchers.',
      progress: 100,
      status: 'completed',
      enrolledDate: new Date('2024-09-15'),
      completedDate: new Date('2024-10-05'),
      modulesCompleted: 4,
      totalModules: 4,
      lastAccessed: new Date('2024-10-05')
    },
    {
      id: 4,
      title: 'Quality Control Fundamentals',
      description: 'Essential quality control procedures and testing methodologies.',
      progress: 100,
      status: 'completed',
      enrolledDate: new Date('2024-08-20'),
      completedDate: new Date('2024-09-10'),
      modulesCompleted: 7,
      totalModules: 7,
      lastAccessed: new Date('2024-09-10')
    },
    {
      id: 5,
      title: 'Advanced Drug Storage Protocols',
      description: 'Master proper storage and handling of temperature-sensitive medications.',
      progress: 83,
      status: 'in-progress',
      enrolledDate: new Date('2024-10-15'),
      modulesCompleted: 5,
      totalModules: 6,
      lastAccessed: new Date('2024-10-26')
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Get filtered courses based on active tab
  get filteredCourses(): EnrolledCourse[] {
    return this.enrolledCourses.filter(course => course.status === this.activeTab);
  }

  // Get count of in-progress courses
  get inProgressCount(): number {
    return this.enrolledCourses.filter(course => course.status === 'in-progress').length;
  }

  // Get count of completed courses
  get completedCount(): number {
    return this.enrolledCourses.filter(course => course.status === 'completed').length;
  }

  // Switch between tabs
  setActiveTab(tab: 'in-progress' | 'completed'): void {
    this.activeTab = tab;
  }

  // Continue learning a course
  continueCourse(courseId: number): void {
    // In a real app, this would navigate to the course content
    alert(`Continuing course ${courseId}...`);
  }

  // View certificate (for completed courses)
  viewCertificate(courseId: number): void {
    // In a real app, this would open/download the certificate
    alert(`Viewing certificate for course ${courseId}...`);
  }

  // Get progress bar color based on progress
  getProgressBarColor(progress: number): string {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-primary';
    return 'bg-primary-variant';
  }
}
