import { Injectable } from "@angular/core";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) export class MockDataService {
  getData() {
    return of({
      name: {
        first: 'John',
        last: 'Doe',
        middle: 'J',
      },
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      },
      contact: {
        phone: '123-456-7890',
        email: 'b5yZ8@example.com'
      },
      employments: [
        {
          company: 'Acme Corp',
          title: 'Software Engineer',
          start: '2021-01-01',
          end: '2022-01-01',
          salary: 50000,
        },
        {
          company: 'Acme Corp',
          title: 'Senior Software Engineer',
          start: '2022-01-01',
          end: '2023-01-01',
          salary: 60000,
        },
        {
          company: 'Acme Corp',
          title: 'Senior Software Engineer',
          start: '2023-01-01',
          end: '2024-01-01',
          salary: 66000,
        }
      ]
    })
  }
}