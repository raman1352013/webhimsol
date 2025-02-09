import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelInformationComponent } from './personnel-information.component';

describe('PersonnelInformationComponent', () => {
  let component: PersonnelInformationComponent;
  let fixture: ComponentFixture<PersonnelInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
