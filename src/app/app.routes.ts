import { Routes } from '@angular/router';
import { SchedulerComponent } from './routes/scheduler/scheduler.component';
import { RouteEmployeeComponent } from './routes/route-employee/route-employee.component';
import { RoutePatchComponent } from './routes/route-patch/route-patch.component';

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
    path: 'patch',
    component: RoutePatchComponent,
  }
];
