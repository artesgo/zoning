import { TestBed } from '@angular/core/testing';
import { SchedulerComponent } from './scheduler.component';

describe('SchedulerComponent', () => {
  let app: SchedulerComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulerComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(SchedulerComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
