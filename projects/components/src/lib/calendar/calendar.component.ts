import { Component, EventEmitter, Input, Output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { pad } from '../helper';

export type CalendarChange = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  formatted: string;
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input() year = dayjs().year();
  @Input() month = dayjs().month() + 1;
  @Input() day = dayjs().date() + 5;
  @Input() hour = dayjs().hour();
  @Input() minute = dayjs().minute();
  @Input() second = dayjs().second();
  @Input() time = false;
  @Input() startSunday = false;
  @Input() debug = false;
  @Input() years = new Array(100).fill(0).map((_, i) => this.year - 99 + i);
  @Input() range = false;

  @Output() change = new EventEmitter<CalendarChange>();

  yearCtrl = new FormControl(this.year);
  monthCtrl = new FormControl(this.month);
  dayCtrl = new FormControl(this.day);
  hourCtrl = new FormControl(this.hour);
  minuteCtrl = new FormControl(this.minute);
  secondCtrl = new FormControl(this.second);

  calendar = new FormGroup({
    year: this.yearCtrl,
    month: this.monthCtrl,
    day: this.dayCtrl,
  });

  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  $ = {
    year: toSignal(this.yearCtrl.valueChanges, {
      initialValue: this.yearCtrl.value,
    }),
    month: toSignal(this.monthCtrl.valueChanges, {
      initialValue: this.monthCtrl.value,
    }),
    day: toSignal(this.dayCtrl.valueChanges, {
      initialValue: this.dayCtrl.value,
    }),
    hour: toSignal(this.hourCtrl.valueChanges, {
      initialValue: this.hourCtrl.value,
    }),
    minute: toSignal(this.minuteCtrl.valueChanges, {
      initialValue: this.minuteCtrl.value,
    }),
    second: toSignal(this.secondCtrl.valueChanges, {
      initialValue: this.secondCtrl.value,
    }),
  };

  daysInMonth = computed(() => {
    return dayjs(`${this.$.year()}-${this.$.month()}-01`).daysInMonth();
  });
  days = computed(() => {
    // get the first day of the week of the month
    const offset = this.startSunday ? 0 : 1;
    let firstDay = dayjs(`${this.$.year()}-${this.$.month()}-01`).day() - offset;
    if (firstDay < 0) firstDay += 7;
    const _pad = new Array(firstDay).fill(-1);
    const _days = new Array(this.daysInMonth()).fill(0).map((_, i) => i + 1);
    return [..._pad, ..._days];
  });
  date = computed(() => {
    if (this.time) {
      return `${this.$.year()}-${pad(this.$.month())}-${pad(this.$.day())}T${pad(this.$.hour())}:${pad(this.$.minute())}:${pad(this.$.second())}`;
    }
    return `${this.$.year()}-${pad(this.$.month())}-${pad(this.$.day())}`;
  });

  dateChange$ = effect(() => {
    this.change.emit({
      year: pad(this.$.year()),
      month: pad(this.$.month()),
      day: pad(this.$.day()),
      hour: pad(this.$.hour()),
      minute: pad(this.$.minute()),
      second: pad(this.$.second()),
      formatted: this.date(),
    });
  });
}
