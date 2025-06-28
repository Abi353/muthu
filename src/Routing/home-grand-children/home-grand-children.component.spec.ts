import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGrandChildrenComponent } from './home-grand-children.component';

describe('HomeGrandChildrenComponent', () => {
  let component: HomeGrandChildrenComponent;
  let fixture: ComponentFixture<HomeGrandChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGrandChildrenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGrandChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
