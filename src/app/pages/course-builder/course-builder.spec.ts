import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBuilder } from './course-builder';

describe('CourseBuilder', () => {
  let component: CourseBuilder;
  let fixture: ComponentFixture<CourseBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
