import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultlayoutcomponentComponent } from './defaultlayoutcomponent.component';

describe('DefaultlayoutcomponentComponent', () => {
  let component: DefaultlayoutcomponentComponent;
  let fixture: ComponentFixture<DefaultlayoutcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultlayoutcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultlayoutcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
