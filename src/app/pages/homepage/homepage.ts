import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements OnInit {
  searchQuery: string = '';

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
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      alert('Search functionality will be connected to job listings page');
    }
  }

  filterByCompany(companyName: string): void {
    console.log('Filtering by company:', companyName);
    alert(`Filtering jobs for ${companyName} - will connect to job listings page`);
  }

  viewJobDetails(jobId: number): void {
    alert(`View details for Job ID: ${jobId} - will connect to job details page`);
  }

  applyNow(jobId: number): void {
    this.router.navigate(['/register'], { queryParams: { jobId: jobId } });
  }
}