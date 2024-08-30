import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatwedoComponent } from './whatwedo.component';

describe('WhatwedoComponent', () => {
  let component: WhatwedoComponent;
  let fixture: ComponentFixture<WhatwedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatwedoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatwedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
