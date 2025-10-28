import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.css']
})
export class ProfileSkillsComponent {
  employee = {
    name: 'Mithila Wickramatunge',
    title: 'Full Stack Developer',
    department: 'IT Department',
    photo: 'https://img.icons8.com/?size=1200&id=20749&format=png',
  };

  certifications = [
    { name: 'Angular Developer', issuer: 'Google', badge: '🅰️', year: 2024 },
    { name: 'MongoDB Associate', issuer: 'MongoDB University', badge: '🍃', year: 2023 },
    { name: 'FastAPI Backend Engineer', issuer: 'FastAPI Academy', badge: '⚡', year: 2025 },
    { name: 'Cloud Practitioner', issuer: 'AWS', badge: '☁️', year: 2024 },
  ];

  skills = [
    { skill: 'Angular', level: 'Advanced', progress: 90 },
    { skill: 'FastAPI', level: 'Intermediate', progress: 75 },
    { skill: 'MongoDB', level: 'Intermediate', progress: 70 },
    { skill: 'UI Design', level: 'Beginner', progress: 50 },
  ];
}
