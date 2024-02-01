import { Component } from '@angular/core';
import { EmployeesComponent } from '@components';

@Component({
  selector: 'app-route-employee',
  standalone: true,
  imports: [ EmployeesComponent ],
  templateUrl: './route-employee.component.html',
  styleUrl: './route-employee.component.scss'
})
export class RouteEmployeeComponent {

}
