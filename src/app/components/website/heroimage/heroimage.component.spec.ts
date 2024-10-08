import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroimageComponent } from './heroimage.component';

describe('HeroimageComponent', () => {
  let component: HeroimageComponent;
  let fixture: ComponentFixture<HeroimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
