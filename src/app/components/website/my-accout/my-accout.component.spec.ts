import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccoutComponent } from './my-accout.component';

describe('MyAccoutComponent', () => {
  let component: MyAccoutComponent;
  let fixture: ComponentFixture<MyAccoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAccoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
