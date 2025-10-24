import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Job {
  id: number;
  title: string;
  company: string;
  status: 'Open' | 'Closed';
}

@Component({
  selector: 'app-job-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-management.component.html',
  styleUrl: './job-management.component.css',
})
export class JobManagementComponent {
  jobs: Job[] = [
    { id: 1, title: 'Senior Frontend Developer', company: 'Tech Corp', status: 'Open' },
    { id: 2, title: 'Backend Engineer', company: 'Innovation Labs', status: 'Open' },
    { id: 3, title: 'Full Stack Developer', company: 'Digital Solutions', status: 'Closed' },
    { id: 4, title: 'DevOps Engineer', company: 'Cloud Systems', status: 'Open' },
  ];

  constructor(private router: Router) {}

  createNewJob() {
    this.router.navigate(['/jobs/new']);
  }

  editJob(jobId: number) {
    this.router.navigate(['/jobs/edit', jobId]);
  }

  toggleJobStatus(job: Job) {
    job.status = job.status === 'Open' ? 'Closed' : 'Open';
  }
}
