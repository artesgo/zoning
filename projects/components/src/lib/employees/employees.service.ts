import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  employees = signal<string[]>(JSON.parse(localStorage.getItem('employees') || '[]'));

  empoyeesEffect = effect(() => {
    localStorage.setItem('employees', JSON.stringify(this.employees()));
  });
}
