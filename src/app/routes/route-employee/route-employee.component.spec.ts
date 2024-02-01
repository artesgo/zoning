import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEmployeeComponent } from './route-employee.component';

describe('RouteEmployeeComponent', () => {
  let component: RouteEmployeeComponent;
  let fixture: ComponentFixture<RouteEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
