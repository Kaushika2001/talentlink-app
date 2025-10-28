// src/app/admin/employee-management/employee-management.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Employee } from '../../core/models/employee.model';
import { AdminDataService } from '../../core/services/admin-data.service';

interface EmployeeView extends Employee {
  coursesTotal: number;
  coursesCompleted: number;
  overdueCount: number;
  careerPath?: string | null;
  skills: string[];
}

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './employee-management.html',
})
export class EmployeeManagementComponent implements OnInit {
  allEmployees: EmployeeView[] = [];
  filteredEmployees: EmployeeView[] = [];
  searchTerm = '';
  progressFilter: '' | 'Overdue' | 'On Track' = '';

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe((data) => {
      // Enrich with LMS/PMS view data
      this.allEmployees = data.map((e) => this.toView(e));
      this.filteredEmployees = [...this.allEmployees];
    });
  }

  private toView(e: Employee): EmployeeView {
    // Mock derived data for demo
    const coursesTotal = 6;
    const completedSeed = (e.id % 5) + 1;
    const coursesCompleted = Math.min(completedSeed, coursesTotal);
    const overdueCount = e.id % 3 === 0 ? 1 : 0;
    const careerPath = e.department.includes('Sales')
      ? 'Sales Team Leader'
      : e.department.includes('Logistics')
      ? 'Logistics Coordinator'
      : 'Core Skills';
    const skills = [e.title.split(' ')[0], e.department, 'Communication'].filter(Boolean);
    return { ...e, coursesTotal, coursesCompleted, overdueCount, careerPath, skills };
  }

  // Search and filter across multiple fields
  filterEmployees(): void {
    let list = [...this.allEmployees];
    const q = this.searchTerm.toLowerCase();
    if (q) {
      list = list.filter(
        (emp) =>
          emp.name.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.title.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q)
      );
    }
    if (this.progressFilter === 'Overdue') {
      list = list.filter((e) => e.overdueCount > 0);
    } else if (this.progressFilter === 'On Track') {
      list = list.filter((e) => e.overdueCount === 0);
    }
    this.filteredEmployees = list;
  }

  viewProfile(employeeId: number): void {
    alert('Viewing profile for employee ID: ' + employeeId);
  }

  assignCareerPath(employeeId: number): void {
    const emp = this.allEmployees.find((e) => e.id === employeeId);
    if (emp) {
      emp.careerPath = emp.careerPath || 'Core Skills';
      alert(`Assigned/confirmed career path for ${emp.name}`);
    }
  }

  assignTraining(employeeId: number): void {
    const emp = this.allEmployees.find((e) => e.id === employeeId);
    if (emp) {
      emp.coursesTotal += 1;
      alert(`Assigned a new course to ${emp.name}`);
    }
  }

  recommendForRole(employeeId: number): void {
    const emp = this.allEmployees.find((e) => e.id === employeeId);
    if (emp) {
      alert(`${emp.name} has been recommended for the next role.`);
    }
  }
}