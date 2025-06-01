import { Component } from '@angular/core';
import { HoursComponent } from '@components';
@Component({
  selector: 'app-route-hours',
  standalone: true,
  imports: [HoursComponent],
  templateUrl: './route-hours.component.html',
  styleUrl: './route-hours.component.scss',
})
export class RouteHoursComponent {}
