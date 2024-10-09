import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebdashboardComponent } from './webdashboard.component';

describe('WebdashboardComponent', () => {
  let component: WebdashboardComponent;
  let fixture: ComponentFixture<WebdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
