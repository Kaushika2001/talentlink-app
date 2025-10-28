import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // 'of' creates an observable from mock data
import { Applicant } from '../models/applicant.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  // Mock data for applicants
  private mockApplicants: Applicant[] = [
    { id: 1, name: 'Alice Smith', appliedFor: 'Logistics Coordinator', status: 'Passed Quiz', quizScore: 92 },
    { id: 2, name: 'Bob Johnson', appliedFor: 'Logistics Coordinator', status: 'In Training', quizScore: null },
    { id: 3, name: 'Charlie Brown', appliedFor: 'Sales Associate', status: 'Failed', quizScore: 45 },
    { id: 4, name: 'David Lee', appliedFor: 'Pharma Technician', status: 'Passed Quiz', quizScore: 81 },
    { id: 5, name: 'Eve Davis', appliedFor: 'Pharma Technician', status: 'Pending Review', quizScore: 88 },
  ];

  // Mock data for employees
  private mockEmployees: Employee[] = [
    { id: 101, name: 'Michael Scott', email: 'm.scott@company.com', title: 'Regional Manager', department: 'Management' },
    { id: 102, name: 'Dwight Schrute', email: 'd.schrute@company.com', title: 'Sales Rep', department: 'Sales' },
    { id: 103, name: 'Jim Halpert', email: 'j.halpert@company.com', title: 'Sales Rep', department: 'Sales' },
    { id: 104, name: 'Pam Beesly', email: 'p.beesly@company.com', title: 'Office Admin', department: 'Admin' },
    { id: 105, name: 'Kevin Malone', email: 'k.malone@company.com', title: 'Accountant', department: 'Accounting' },
  ];

  constructor() { }

  // Method to get applicants
  getApplicants(): Observable<Applicant[]> {
    return of(this.mockApplicants);
  }

  // Method to get employees
  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees);
  }
}