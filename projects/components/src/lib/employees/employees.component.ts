import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  empService = inject(EmployeesService);
  employee = new FormControl('');
  position = new FormControl(6);
  employees = this.empService.employees;
  positions = this.empService.positions;

  enter() {
    if (this.employee.value) {
      this.employees.set([...this.employees(), this.employee.value]);
    }
  }

  remove(name: string) {
    this.employees.set(this.employees().filter((e) => e !== name));
  }

  enterPosition() {
    if (this.position.value) {
      this.empService.positions.set(this.position.value);
    }
  }
}
