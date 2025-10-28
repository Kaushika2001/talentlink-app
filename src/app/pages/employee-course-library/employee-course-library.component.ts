import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Course {
  id: number;
  title: string;
  description: string;
  skill: string;
  division: string;
  duration: string;
  modulesCount: number;
  imageUrl?: string;
  enrolled?: boolean;
}

@Component({
  selector: 'app-employee-course-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-course-library.component.html',
  styleUrl: './employee-course-library.component.css'
})
export class EmployeeCourseLibraryComponent implements OnInit {
  courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Pharmaceutical Safety',
      description: 'Learn the fundamental safety protocols and procedures required in pharmaceutical environments.',
      skill: 'Safety',
      division: 'Manufacturing',
      duration: '4 hours',
      modulesCount: 5,
      imageUrl: 'assets/images/course-1.jpg',
      enrolled: false
    },
    {
      id: 2,
      title: 'GMP Compliance Training',
      description: 'Comprehensive training on Good Manufacturing Practices for pharmaceutical staff.',
      skill: 'Compliance',
      division: 'Quality Assurance',
      duration: '6 hours',
      modulesCount: 8,
      imageUrl: 'assets/images/course-2.jpg',
      enrolled: false
    },
    {
      id: 3,
      title: 'Advanced Drug Storage Protocols',
      description: 'Master proper storage and handling of temperature-sensitive medications.',
      skill: 'Storage',
      division: 'Warehouse',
      duration: '3 hours',
      modulesCount: 6,
      imageUrl: 'assets/images/course-3.jpg',
      enrolled: false
    },
    {
      id: 4,
      title: 'Quality Control Fundamentals',
      description: 'Essential quality control procedures and testing methodologies.',
      skill: 'Quality',
      division: 'Quality Assurance',
      duration: '5 hours',
      modulesCount: 7,
      imageUrl: 'assets/images/course-4.jpg',
      enrolled: false
    },
    {
      id: 5,
      title: 'Regulatory Affairs Basics',
      description: 'Introduction to pharmaceutical regulations and compliance requirements.',
      skill: 'Compliance',
      division: 'Regulatory',
      duration: '4 hours',
      modulesCount: 5,
      imageUrl: 'assets/images/course-5.jpg',
      enrolled: false
    },
    {
      id: 6,
      title: 'Laboratory Safety Procedures',
      description: 'Comprehensive laboratory safety training for pharmaceutical researchers.',
      skill: 'Safety',
      division: 'R&D',
      duration: '3 hours',
      modulesCount: 4,
      imageUrl: 'assets/images/course-6.jpg',
      enrolled: false
    }
  ];

  filteredCourses: Course[] = [];
  searchTerm: string = '';
  selectedSkill: string = '';
  selectedDivision: string = '';

  // Extract unique skills and divisions for filters
  skills: string[] = [];
  divisions: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredCourses = [...this.courses];
    this.skills = [...new Set(this.courses.map(c => c.skill))];
    this.divisions = [...new Set(this.courses.map(c => c.division))];
  }

  // Apply all filters
  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !this.searchTerm || 
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesSkill = !this.selectedSkill || course.skill === this.selectedSkill;
      const matchesDivision = !this.selectedDivision || course.division === this.selectedDivision;

      return matchesSearch && matchesSkill && matchesDivision;
    });
  }

  // Reset all filters
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSkill = '';
    this.selectedDivision = '';
    this.filteredCourses = [...this.courses];
  }

  // Enroll in a course
  enrollCourse(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.enrolled = true;
      // In a real app, this would call a service to enroll the user
      alert(`Successfully enrolled in: ${course.title}`);
    }
  }
}
