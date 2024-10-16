import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTypesComponent } from './tree-types.component';

describe('TreeTypesComponent', () => {
  let component: TreeTypesComponent;
  let fixture: ComponentFixture<TreeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
