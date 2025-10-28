import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantManagement } from './applicant-management';

describe('ApplicantManagement', () => {
  let component: ApplicantManagement;
  let fixture: ComponentFixture<ApplicantManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
