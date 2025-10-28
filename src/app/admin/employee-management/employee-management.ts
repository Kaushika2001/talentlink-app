// src/app/admin/employee-management/employee-management.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Employee } from '../../core/models/employee.model';
import { AdminDataService } from '../../core/services/admin-data.service';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './employee-management.html',
})
export class EmployeeManagementComponent implements OnInit {

  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(data => {
      this.allEmployees = data;
      this.filteredEmployees = data;
    });
  }

  // Updated to search across more fields
  filterEmployees(): void {
    const lowerSearch = this.searchTerm.toLowerCase();
    
    if (!lowerSearch) {
      this.filteredEmployees = this.allEmployees; // Show all if search is empty
      return;
    }

    this.filteredEmployees = this.allEmployees.filter(
      emp => emp.name.toLowerCase().includes(lowerSearch) ||
             emp.email.toLowerCase().includes(lowerSearch) ||
             emp.title.toLowerCase().includes(lowerSearch) ||
             emp.department.toLowerCase().includes(lowerSearch) // Added department search
    );
  }
  
  viewProfile(employeeId: number): void {
    alert('Viewing profile for employee ID: ' + employeeId);
    // Future: this.router.navigate(['/admin/employee', employeeId]);
  }
  
  assignCareerPath(employeeId: number): void {
    alert('Assigning career path for employee ID: ' + employeeId);
    // Future: openAssignPathModal(employeeId);
  }
}