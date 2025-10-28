import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRegistration } from './applicant-registration';

describe('ApplicantRegistration', () => {
  let component: ApplicantRegistration;
  let fixture: ComponentFixture<ApplicantRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
