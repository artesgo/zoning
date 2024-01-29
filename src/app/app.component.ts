import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoning';
  date = '';

  onDate(date: string) {
    // why blur emits an empty event
    if (date) {
      this.date = date;
    }
  }
}
