import { Routes } from '@angular/router';
import { SchedulerComponent } from './routes/scheduler/scheduler.component';
import { RouteEmployeeComponent } from './routes/route-employee/route-employee.component';

export const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent
  },
  {
    path: 'emp',
    component: RouteEmployeeComponent,
  }
];
