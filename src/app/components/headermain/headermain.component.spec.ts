import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadermainComponent } from './headermain.component';

describe('HeadermainComponent', () => {
  let component: HeadermainComponent;
  let fixture: ComponentFixture<HeadermainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadermainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadermainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
