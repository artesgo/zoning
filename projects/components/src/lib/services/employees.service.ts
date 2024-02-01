import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
}) export class EmployeesService {
  employees = signal<string[]>(JSON.parse(localStorage.getItem('employees') || '[]'));
}