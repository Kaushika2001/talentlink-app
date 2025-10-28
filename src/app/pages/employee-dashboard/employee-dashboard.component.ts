import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  title: string;
  dueDate: string;
  progress: number;
}

interface CareerStage {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  employeeName = 'Mithila Rasanjith';
  today = new Date();

  mandatoryCourses: Course[] = [
    { title: 'Workplace Safety', dueDate: '2025-11-15', progress: 100 },
    { title: 'Code of Conduct', dueDate: '2025-12-01', progress: 70 },
    { title: 'Data Privacy & Security', dueDate: '2025-12-20', progress: 30 }
  ];

  careerPath: CareerStage[] = [
    { title: 'Junior IT Associate', completed: true },
    { title: 'Software Engineer', completed: true },
    { title: 'Senior Developer', completed: false },
    { title: 'Team Lead', completed: false }
  ];

  announcements = [
    { message: 'System maintenance scheduled for Nov 10th, 9–11 AM', type: 'info' },
    { message: 'New course available: Advanced Angular', type: 'new' },
    { message: 'Submit Q4 goals by November 30th', type: 'reminder' }
  ];

  get overallProgress(): number {
    const total = this.mandatoryCourses.reduce((acc, c) => acc + c.progress, 0);
    return Math.round(total / this.mandatoryCourses.length);
  }
}
