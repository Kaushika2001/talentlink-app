import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../admin/services/admin.service';

@Component({
	selector: 'app-applicant-sidebar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './applicant-sidebar.component.html',
	styleUrl: './applicant-sidebar.component.css',
})
export class ApplicantSidebarComponent {
	@Output() sidebarToggled = new EventEmitter<boolean>();
	isSidebarCollapsed = false;
	private adminService = inject(AdminService);

	menuItems = [
		{ icon: 'book', label: 'Modules', route: '/applicant/modules', active: true },
		{ icon: 'quiz', label: 'Quiz', route: '/applicant/quiz', active: false },
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
			book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c-1.1-.9-2-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
			quiz: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 15h-1v-2h2v2h-1zm1.07-7.75l-.9.92c-.5.5-.82 1.04-.97 1.83-.05.27-.08.45-.1.75H10v-.5c.03-.58.2-1.12.5-1.62.19-.31.44-.59.77-.92l1.2-1.2c.37-.37.56-.86.56-1.41 0-1.1-.9-2-2-2-1.05 0-1.91.82-2 .86l-.72-.69C8.07 3.34 9.03 2.5 10.5 2.5c1.93 0 3.5 1.57 3.5 3.5 0 .86-.34 1.64-.93 2.25z',
		};
		return icons[icon] || icons['book'];
	}
}
