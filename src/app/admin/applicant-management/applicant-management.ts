// src/app/admin/applicant-management/applicant-management.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Applicant } from '../../core/models/applicant.model';
import { AdminDataService } from '../../core/services/admin-data.service';

type ApplicantStage = 'New' | 'In Pathway' | 'Certified' | 'Shortlisted' | 'Interview Scheduled' | 'Hired' | 'Rejected';

interface ApplicantView extends Applicant {
  progress: number; // 0-100 pathway progress
  stage: ApplicantStage;
  assignedPathway?: string | null;
}

@Component({
  selector: 'app-applicant-management',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './applicant-management.html',
})
export class ApplicantManagementComponent implements OnInit {
  allApplicants: ApplicantView[] = [];
  filteredApplicants: ApplicantView[] = [];
  searchTerm = '';
  statusFilter = '';
  stageFilter: ApplicantStage | '' = '';

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.dataService.getApplicants().subscribe((data) => {
      // Enrich with progress/stage for ATS+LMS alignment
      this.allApplicants = data.map((a) => this.withDerivedFields(a));
      this.filteredApplicants = [...this.allApplicants];
    });
  }

  private withDerivedFields(a: Applicant): ApplicantView {
    // Derive a basic progress from known status/quiz
    let progress = 0;
    let stage: ApplicantStage = 'New';
    switch (a.status) {
      case 'In Training':
        progress = 40;
        stage = 'In Pathway';
        break;
      case 'Pending Review':
        progress = 70;
        stage = 'Shortlisted';
        break;
      case 'Passed Quiz':
        progress = 100;
        stage = 'Certified';
        break;
      case 'Failed':
        progress = 100;
        stage = 'Rejected';
        break;
      default:
        progress = a.quizScore ? Math.min(100, a.quizScore) : 0;
        stage = 'New';
    }
    return {
      ...a,
      progress,
      stage,
      assignedPathway: a.appliedFor ? `${a.appliedFor} - Pre-Hiring Pathway` : null,
    };
  }

  filterApplicants(): void {
    let list = [...this.allApplicants];

    if (this.statusFilter) {
      list = list.filter((a) => a.status === this.statusFilter);
    }
    if (this.stageFilter) {
      list = list.filter((a) => a.stage === this.stageFilter);
    }
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.appliedFor.toLowerCase().includes(q)
      );
    }

    this.filteredApplicants = list;
  }

  // Actions
  assignPathway(a: ApplicantView) {
    a.assignedPathway = a.assignedPathway || `${a.appliedFor} - Pre-Hiring Pathway`;
    if (a.stage === 'New') {
      a.status = 'In Training';
      a.progress = 10;
    }
    alert(`Assigned pathway to ${a.name}`);
  }

  markShortlisted(a: ApplicantView) {
    a.stage = 'Shortlisted';
    a.status = 'Pending Review';
    a.progress = Math.max(a.progress, 70);
  }

  scheduleInterview(a: ApplicantView) {
    a.stage = 'Interview Scheduled';
  }

 

  markRejected(a: ApplicantView) {
    a.stage = 'Rejected';
    a.status = 'Failed';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed Quiz':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-blue-100 text-blue-800';
      case 'In Training':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-error text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStageClass(stage: ApplicantStage): string {
    const map: Record<ApplicantStage, string> = {
      'New': 'bg-gray-100 text-gray-800',
      'In Pathway': 'bg-yellow-100 text-yellow-800',
      'Certified': 'bg-green-100 text-green-800',
      'Shortlisted': 'bg-blue-100 text-blue-800',
      'Interview Scheduled': 'bg-indigo-100 text-indigo-800',
      'Hired': 'bg-emerald-100 text-emerald-800',
      'Rejected': 'bg-red-100 text-red-800',
    };      
    return map[stage];
  }
}