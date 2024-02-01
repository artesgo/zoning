import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  empService = inject(EmployeesService);
  employee = new FormControl('');
  employees: string[] = JSON.parse(localStorage.getItem('employees') || '[]');

  ngOnInit() {
    this.empService.employees.set(this.employees);
  }

  enter() {
    if (this.employee.value) {
      this.employees = [...this.employees, this.employee.value];
      this.setEmployees();
    }
  }

  remove(name: string) {
    this.employees = this.employees.filter((e) => e !== name);
    this.setEmployees();
  }

  setEmployees() {
    this.empService.employees.set(this.employees);
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }
}
