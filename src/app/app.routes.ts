import { Routes } from '@angular/router';
import { SchedulerComponent } from './routes/scheduler/scheduler.component';
import { RouteEmployeeComponent } from './routes/route-employee/route-employee.component';
import { RoutePatchComponent } from './routes/route-patch/route-patch.component';
import { RouteHoursComponent } from './routes/route-hours/route-hours.component';

export const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
  },
  {
    path: 'emp',
    component: RouteEmployeeComponent,
  },
  {
    path: 'hours',
    component: RouteHoursComponent,
  },
  {
    path: 'patch',
    component: RoutePatchComponent,
  },
];
