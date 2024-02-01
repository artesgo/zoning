import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
}) export class EmployeesService {
  employees = signal<string[]>([]);
}