import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HoursService {
  start = signal<string[]>(JSON.parse(localStorage.getItem('startHours') || '["7:30 AM", "8:00 AM"]'));
  end = signal<string[]>(JSON.parse(localStorage.getItem('endHours') || '["2:30 PM", "3:00 PM", "5:00 PM"]'));

  startEffect = effect(() => {
    localStorage.setItem('startHours', JSON.stringify(this.start()));
  });
  endEffect = effect(() => {
    localStorage.setItem('endHours', JSON.stringify(this.end()));
  });
}
