import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebServicesComponent } from './web-services.component';

describe('WebServicesComponent', () => {
  let component: WebServicesComponent;
  let fixture: ComponentFixture<WebServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
