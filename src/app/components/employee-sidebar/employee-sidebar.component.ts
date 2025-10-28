import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../admin/services/admin.service';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-sidebar.component.html',
  styleUrl: './employee-sidebar.component.css',
})
export class EmployeeSidebarComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  isSidebarCollapsed = false;
  private adminService = inject(AdminService);

  menuItems = [
    { icon: 'home', label: 'Dashboard', route: '/employee/dashboard', active: true },
    { icon: 'user', label: 'Profile', route: '/employee/profile', active: false },
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarToggled.emit(this.isSidebarCollapsed);
  }

  onLogout() {
    this.adminService.logout();
  }

  getIconPath(icon: string): string {
    const icons: Record<string, string> = {
      home: 'M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5H9v5a2 2 0 0 1-2 2H3z',
      user: 'M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z',
    };
    return icons[icon] || icons['home'];
  }
}
