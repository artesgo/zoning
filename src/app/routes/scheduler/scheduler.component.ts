import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarChange, CalendarComponent } from '@components';
import dayjs from 'dayjs';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, CommonModule, CalendarComponent ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent {
  time = false;
  month = 0;
  months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  employees = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
  ];

  week = new Array(7).fill(dayjs());

  onDate(data: CalendarChange) {
    // get first day of the week from selected date
    this.week = new Array(7).fill(0).map((_, i) => dayjs(data.formatted).startOf('week').add(i + 1, 'day'));
  }
}
