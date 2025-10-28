// src/app/admin/applicant-management/applicant-management.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Applicant } from '../../core/models/applicant.model';
import { AdminDataService } from '../../core/services/admin-data.service';

@Component({
  selector: 'app-applicant-management',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './applicant-management.html',
})
export class ApplicantManagementComponent implements OnInit {
  
  allApplicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  searchTerm: string = '';
  statusFilter: string = ''; 

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.dataService.getApplicants().subscribe(data => {
      this.allApplicants = data;
      this.filteredApplicants = data; 
    });
  }

  filterApplicants(): void {
    let tempApplicants = this.allApplicants;

    if (this.statusFilter) {
      tempApplicants = tempApplicants.filter(
        app => app.status === this.statusFilter
      );
    }

    if (this.searchTerm) {
      const lowerSearch = this.searchTerm.toLowerCase();
      tempApplicants = tempApplicants.filter(
        app => app.name.toLowerCase().includes(lowerSearch) || 
               app.appliedFor.toLowerCase().includes(lowerSearch)
      );
    }

    this.filteredApplicants = tempApplicants;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed Quiz': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-blue-100 text-blue-800'; // Changed from yellow for variety
      case 'In Training': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-error text-white'; // Uses your custom error color
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}