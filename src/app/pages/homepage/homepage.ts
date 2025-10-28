import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements OnInit {
  searchQuery: string = '';
  filteredJobs: any[] = [];
  isSearchActive: boolean = false;

  // Updated to reflect actual Chandrasiri Group companies
  companies = [
    { name: 'Chandrasiri Distributors', icon: '💊', openPositions: 8, description: 'Pharmaceutical Distribution' },
    { name: 'Chandrasiri Pharmaceutical', icon: '🏥', openPositions: 5, description: 'Hospital Supply' },
    { name: 'Chandrasiri Agencies', icon: '🌾', openPositions: 6, description: 'Prima Flour Distribution' },
    { name: 'Lounge 171', icon: '☕', openPositions: 12, description: 'Restaurant & Coffee Shop' }
  ];

  // Updated job examples to reflect actual companies
  featuredJobs = [
    {
      id: 1,
      title: 'Pharmaceutical Sales Representative',
      company: 'Chandrasiri Distributors',
      location: 'Maharagama, Sri Lanka',
      type: 'Full-time',
      description: 'Join our pharmaceutical distribution team. Build relationships with pharmacies and ensure quality product delivery. Complete our pharma training pathway to qualify.'
    },
    {
      id: 2,
      title: 'Warehouse Manager',
      company: 'Chandrasiri Pharmaceutical',
      location: 'Colombo, Sri Lanka',
      type: 'Full-time',
      description: 'Manage pharmaceutical inventory for hospital supplies. Ensure compliance with storage standards and timely delivery. Training provided.'
    },
    {
      id: 3,
      title: 'Distribution Coordinator',
      company: 'Chandrasiri Agencies',
      location: 'Maharagama, Sri Lanka',
      type: 'Full-time',
      description: 'Coordinate Prima flour distribution to wholesale shops. Manage logistics and maintain supplier relationships. Comprehensive training included.'
    },
    {
      id: 4,
      title: 'Barista',
      company: 'Lounge 171',
      location: 'Maharagama, Sri Lanka',
      type: 'Full-time',
      description: 'Craft quality coffee and beverages for our customers. Create memorable experiences at our cozy cafe. Coffee training certification provided.'
    },
    {
      id: 5,
      title: 'Kitchen Staff',
      company: 'Lounge 171',
      location: 'Maharagama, Sri Lanka',
      type: 'Full-time',
      description: 'Prepare fresh bakery items and meals using traditional recipes. Join our experienced kitchen team. On-the-job training available.'
    },
    {
      id: 6,
      title: 'Logistics Officer',
      company: 'Chandrasiri Agencies',
      location: 'Multiple Locations',
      type: 'Contract',
      description: 'Optimize delivery routes and manage distribution efficiency. Support our flour distribution network across Sri Lanka.'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize with all jobs
    this.filteredJobs = [...this.featuredJobs];
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    
    if (query) {
      this.isSearchActive = true;
      // Filter jobs based on search query
      this.filteredJobs = this.featuredJobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query)
      );
      
      // Scroll to jobs section
      this.scrollToSection('jobs');
    } else {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearchActive = false;
    this.filteredJobs = [...this.featuredJobs];
  }

  get searchResultsText(): string {
    if (!this.isSearchActive) return '';
    const count = this.filteredJobs.length;
    return count === 0 ? 'No jobs found' : `Found ${count} job${count !== 1 ? 's' : ''}`;
  }

  filterByCompany(companyName: string): void {
    this.searchQuery = companyName;
    this.isSearchActive = true;
    this.filteredJobs = this.featuredJobs.filter(job => 
      job.company.toLowerCase().includes(companyName.toLowerCase())
    );
    this.scrollToSection('jobs');
  }

  viewJobDetails(jobId: number): void {
    alert(`View details for Job ID: ${jobId} - will connect to job details page`);
  }

  applyNow(jobId: number): void {
    this.router.navigate(['/register'], { queryParams: { jobId: jobId } });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}