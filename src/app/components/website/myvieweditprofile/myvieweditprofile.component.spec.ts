import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvieweditprofileComponent } from './myvieweditprofile.component';

describe('MyvieweditprofileComponent', () => {
  let component: MyvieweditprofileComponent;
  let fixture: ComponentFixture<MyvieweditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyvieweditprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyvieweditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
