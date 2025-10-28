import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeeSidebarComponent } from '../../components/employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmployeeSidebarComponent],
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.css',
})
export class EmployeeLayoutComponent {
  isCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }
}
