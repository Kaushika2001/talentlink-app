// src/app/admin/dashboard/dashboard.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true, // <-- Add this
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css', // If you have a CSS file
})
export class Dashboard {}