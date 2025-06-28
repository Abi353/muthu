import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomechildComponent } from './homechild.component';

describe('HomechildComponent', () => {
  let component: HomechildComponent;
  let fixture: ComponentFixture<HomechildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomechildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomechildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
