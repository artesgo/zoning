import { Component, EventEmitter, Input, Output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';

function pad(input: number | null) {
  if (!input) return '00';
  return input < 10 ? `0${input}` : input.toString();
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input() year = dayjs().year();
  @Input() month = dayjs().month() + 1;
  @Input() day = dayjs().date();
  @Input() hour = dayjs().hour();
  @Input() minute = dayjs().minute();
  @Input() second = dayjs().second();
  @Input() time = false;
  
  @Output() change = new EventEmitter<{ year: string; month: string; day: string; hour: string; minute: string; second: string, formatted: string }>();

  yearCtrl = new FormControl(this.year);
  monthCtrl = new FormControl(this.month);
  dayCtrl = new FormControl(this.day);
  hourCtrl = new FormControl(this.hour);
  minuteCtrl = new FormControl(this.minute);
  secondCtrl = new FormControl(this.second);

  calendar = new FormGroup({
    year: this.yearCtrl,
    month: this.monthCtrl,
    day: this.dayCtrl
  });

  years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
	months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  $ = {
    year: toSignal(this.yearCtrl.valueChanges, {
      initialValue: this.yearCtrl.value
    }),
    month: toSignal(this.monthCtrl.valueChanges, {
      initialValue: this.monthCtrl.value
    }),
    day: toSignal(this.dayCtrl.valueChanges, {
      initialValue: this.dayCtrl.value
    }),
    hour: toSignal(this.hourCtrl.valueChanges, {
      initialValue: this.hourCtrl.value
    }),
    minute: toSignal(this.minuteCtrl.valueChanges, {
      initialValue: this.minuteCtrl.value
    }),
    second: toSignal(this.secondCtrl.valueChanges, {
      initialValue: this.secondCtrl.value
    }),
  }

  daysInMonth = computed(() => {
    return dayjs(`${this.$.year()}-${this.$.month()}-01`).daysInMonth();
  });
  days = computed(() => new Array(this.daysInMonth()).fill(0).map((_, i) => i + 1));

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
