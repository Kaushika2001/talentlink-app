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
    { id: 5, title: 'UI/UX Designer', company: 'Creative Agency', status: 'Open' },
    { id: 6, title: 'Product Manager', company: 'Startup Inc', status: 'Open' },
    { id: 7, title: 'Data Scientist', company: 'Analytics Pro', status: 'Closed' },
    { id: 8, title: 'Mobile Developer', company: 'App Solutions', status: 'Open' },
    { id: 9, title: 'QA Engineer', company: 'Quality Systems', status: 'Open' },
    { id: 10, title: 'System Architect', company: 'Enterprise Tech', status: 'Closed' },
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
