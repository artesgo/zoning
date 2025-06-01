import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteHoursComponent } from './route-hours.component';

describe('RouteHoursComponent', () => {
  let component: RouteHoursComponent;
  let fixture: ComponentFixture<RouteHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteHoursComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
