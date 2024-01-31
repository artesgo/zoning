import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  employee = new FormControl('');
  employees: string[] = JSON.parse(localStorage.getItem('employees') || '[]');

  enter() {
    if (this.employee.value) {
      this.employees = [...this.employees, this.employee.value];
      localStorage.setItem('employees', JSON.stringify(this.employees));
    }
  }
}
