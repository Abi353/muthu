import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingComponentComponent } from './binding-component.component';

describe('BindingComponentComponent', () => {
  let component: BindingComponentComponent;
  let fixture: ComponentFixture<BindingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BindingComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BindingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
