import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldcountComponent } from './worldcount.component';

describe('WorldcountComponent', () => {
  let component: WorldcountComponent;
  let fixture: ComponentFixture<WorldcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldcountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
