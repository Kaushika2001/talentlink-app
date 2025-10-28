import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'pdf';
  url: string;
  completed: boolean;
}

interface Module {
  id: number;
  name: string;
  lessons: Lesson[];
}

@Component({
  selector: 'app-module-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.css']
})

export class ModulePageComponent implements OnInit {
  currentModuleIndex = 0;
  selectedLesson: Lesson | null = null;
  
   modules: Module[] = [
    {
      id: 1,
      name: 'Inventory Management',
      lessons: [
      {
        id: 1,
        title: 'Introduction to Inventory Management',
        type: 'video',
        url:'https://www.youtube.com/embed/tgbNymZ7vqY',
        completed: false
      },
      {
      id: 2,
      title: 'Inventory Tracking',
      type: 'pdf',
      url: 'https://www.getorderly.com/wp-content/uploads/2017/04/The-2017-Complete-Guide-to-Restaurant-Inventory.pdf?utm_source=chatgpt.com',
      completed: false
    },
      {
        id: 3,
        title: 'Stock Ordering',
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 4,
        title: 'Preventing Waste and Loss',
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 5,
        title: 'Inventory Software and Tools',
        type: 'pdf',
        url: 'https://www.getorderly.com/wp-content/uploads/2017/04/The-2017-Complete-Guide-to-Restaurant-Inventory.pdf?utm_source=chatgpt.com',
        completed: false
      }
    ]
  },
  {
      id: 2,
      name: 'Customer Service Excellence',
      lessons: [
      {
        id: 1,
        title: 'Introduction to Customer Service',
        type: 'video',
        url:'https://www.youtube.com/embed/tgbNymZ7vqY',
        completed: false
      },
      {
      id: 2,
      title: 'Greeting and Seating Customers',
      type: 'pdf',
      url: 'https://www.getorderly.com/wp-content/uploads/2017/04/The-2017-Complete-Guide-to-Restaurant-Inventory.pdf?utm_source=chatgpt.com',
      completed: false
    },
      {
        id: 3,
        title: 'Handling Difficult Situations',
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 4,
        title: 'Upselling and Suggestive Selling',
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 5,
        title: 'Teamwork in Customer Service',
        type: 'pdf',
        url: 'https://www.getorderly.com/wp-content/uploads/2017/04/The-2017-Complete-Guide-to-Restaurant-Inventory.pdf?utm_source=chatgpt.com',
        completed: false
      }
    ]
  }
  
    
  ];

  constructor(private sanitizer: DomSanitizer, private router: Router) {}
 ngOnInit() {
    // Select first lesson of first module by default
    if (this.modules.length > 0 && this.modules[0].lessons.length > 0) {
      this.selectedLesson = this.modules[0].lessons[0];
    }
  }

  get currentModule(): Module {
    return this.modules[this.currentModuleIndex];
  }

  get moduleName(): string {
    return this.currentModule.name;
  }

 get lessons(): Lesson[] {
    return this.currentModule.lessons;
  }

    selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
  }
 markAsCompleted() {
    if (this.selectedLesson) {
      this.selectedLesson.completed = true;
      
      // Auto-select next incomplete lesson
      const currentIndex = this.lessons.findIndex(l => l.id === this.selectedLesson!.id);
      const nextLesson = this.lessons.slice(currentIndex + 1).find(l => !l.completed);
      
      if (nextLesson) {
        this.selectedLesson = nextLesson;
      }
    }
  }

   goToNextModule() {
    if (this.currentModuleIndex < this.modules.length - 1) {
      // Move to next module
      this.currentModuleIndex++;
      
      // Select first lesson of the new module
      if (this.lessons.length > 0) {
        this.selectedLesson = this.lessons[0];
      }
    }
  }

  
   getModuleNumber(): string {
    return `Module ${this.currentModuleIndex + 1} of ${this.modules.length}`;
  }

  getCompletedCount(): number {
    return this.lessons.filter(l => l.completed).length;
  }

  getProgressPercentage(): number {
    return Math.round((this.getCompletedCount() / this.lessons.length) * 100);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

    goToQuiz() {
    this.router.navigate(['/quiz']);
  }
}