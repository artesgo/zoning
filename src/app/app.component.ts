import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent, ThemeComponent } from '@components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, ThemeComponent],
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
