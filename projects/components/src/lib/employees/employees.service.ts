import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  employees = signal<string[]>(JSON.parse(localStorage.getItem('employees') || '[]'));
  positions = signal<number>(JSON.parse(localStorage.getItem('positions') || '6'));
  empoyeesEffect = effect(() => {
    localStorage.setItem('employees', JSON.stringify(this.employees()));
  });
  positionsEffect = effect(() => {
    localStorage.setItem('positions', JSON.stringify(this.positions()));
  });
}
