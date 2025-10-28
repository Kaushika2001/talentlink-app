import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApplicantSidebarComponent } from '../../components/applicant-sidebar/applicant-sidebar.component';

@Component({
  selector: 'app-applicant-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ApplicantSidebarComponent],
  templateUrl: './applicant-layout.component.html',
  styleUrl: './applicant-layout.component.css',
})
export class ApplicantLayoutComponent {
  isCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }
}
