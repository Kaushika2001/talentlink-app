import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Course {
  id: number;
  name: string;
  selected: boolean;
}

interface SkillPathway {
  courseId: number;
  courseName: string;
  requiredPassingScore: number;
}

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css',
})
export class JobFormComponent implements OnInit {
  isEditMode = false;
  jobId: number | null = null;

  // Form data
  jobTitle = '';
  company = '';
  description = '';
  requirements = '';
  location = '';
  jobType = 'Full-time';
  salaryRange = '';

  // Skill Pathway Builder
  availableCourses: Course[] = [
    { id: 1, name: 'Advanced JavaScript Programming', selected: false },
    { id: 2, name: 'React Development Fundamentals', selected: false },
    { id: 3, name: 'Node.js Backend Development', selected: false },
    { id: 4, name: 'Database Design and SQL', selected: false },
    { id: 5, name: 'Cloud Computing with AWS', selected: false },
    { id: 6, name: 'DevOps and CI/CD', selected: false },
  ];

  skillPathways: SkillPathway[] = [];
  showCourseSelector = false;

  // Validation
  errors: { [key: string]: string } = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.jobId = parseInt(id, 10);
      this.loadJobData(this.jobId);
    }
  }

  goBack() {
    this.router.navigate(['/jobs']);
  }

  loadJobData(id: number) {
    // In a real app, load from a service
    this.jobTitle = 'Senior Frontend Developer';
    this.company = 'Tech Corp';
    this.description = 'We are looking for an experienced frontend developer...';
    this.requirements = "Bachelor's degree in Computer Science or related field...";
    this.location = 'Remote';
    this.jobType = 'Full-time';
    this.salaryRange = '$80,000 - $120,000';

    // Load existing skill pathways
    this.skillPathways = [
      { courseId: 1, courseName: 'Advanced JavaScript Programming', requiredPassingScore: 80 },
      { courseId: 2, courseName: 'React Development Fundamentals', requiredPassingScore: 85 },
    ];

    // Update available courses
    this.skillPathways.forEach((pathway) => {
      const course = this.availableCourses.find((c) => c.id === pathway.courseId);
      if (course) course.selected = true;
    });
  }

  toggleCourseSelector() {
    this.showCourseSelector = !this.showCourseSelector;
  }

  addCourse(course: Course) {
    if (!course.selected) {
      course.selected = true;
      this.skillPathways.push({
        courseId: course.id,
        courseName: course.name,
        requiredPassingScore: 70,
      });
    }
    this.showCourseSelector = false;
  }

  removeCourse(pathway: SkillPathway) {
    this.skillPathways = this.skillPathways.filter((p) => p.courseId !== pathway.courseId);
    const course = this.availableCourses.find((c) => c.id === pathway.courseId);
    if (course) course.selected = false;
  }

  updatePassingScore(pathway: SkillPathway, score: number) {
    pathway.requiredPassingScore = score;
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.jobTitle.trim()) {
      this.errors['jobTitle'] = 'Job title is required';
      isValid = false;
    }

    if (!this.company.trim()) {
      this.errors['company'] = 'Company name is required';
      isValid = false;
    }

    if (!this.description.trim()) {
      this.errors['description'] = 'Job description is required';
      isValid = false;
    }

    if (
      this.skillPathways.some((p) => p.requiredPassingScore < 0 || p.requiredPassingScore > 100)
    ) {
      this.errors['skillPathways'] = 'Passing scores must be between 0 and 100';
      isValid = false;
    }

    return isValid;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const jobData = {
      id: this.jobId,
      title: this.jobTitle,
      company: this.company,
      description: this.description,
      requirements: this.requirements,
      location: this.location,
      jobType: this.jobType,
      salaryRange: this.salaryRange,
      skillPathways: this.skillPathways,
      status: 'Open',
    };

    console.log('Saving job:', jobData);

    // In a real app, save to a service
    alert(this.isEditMode ? 'Job updated successfully!' : 'Job created successfully!');
    this.router.navigate(['/jobs']);
  }

  cancel() {
    this.router.navigate(['/jobs']);
  }
}
