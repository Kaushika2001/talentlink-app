import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

// Interface for our Course model
export interface Course {
  id: number;
  title: string;
  description: string;
  modulesCount: number;
  status: 'Active' | 'Draft' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-course-library',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './course-library.component.html',
  styleUrls: ['./course-library.component.css']
})
export class CourseLibraryComponent implements OnInit {
  // Sample data - in real app, this would come from a service
  courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Pharmaceutical Safety',
      description: 'Basic safety protocols and procedures in pharmaceutical environments',
      modulesCount: 5,
      status: 'Active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 2,
      title: 'GMP Compliance Training',
      description: 'Good Manufacturing Practices for pharmaceutical staff',
      modulesCount: 8,
      status: 'Active',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: 3,
      title: 'Advanced Drug Storage Protocols',
      description: 'Proper storage and handling of temperature-sensitive medications',
      modulesCount: 6,
      status: 'Draft',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    }
  ];

  filteredCourses: Course[] = [];
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredCourses = [...this.courses];
  }

  // Filter courses based on search input
  onSearchChange(): void {
    if (!this.searchTerm) {
      this.filteredCourses = [...this.courses];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term)
    );
  }

  // Get status badge color
  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Delete course (with confirmation)
  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courses = this.courses.filter(course => course.id !== courseId);
      this.filteredCourses = this.filteredCourses.filter(course => course.id !== courseId);
    }
  }
}