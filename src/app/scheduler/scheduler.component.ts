import { Component, EventEmitter, Input, OnInit, Output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import dayjs from 'dayjs';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent implements OnInit {
  @Input() year = dayjs().year();
  @Input() month = dayjs().month() + 1;
  @Input() day = dayjs().date();
  
  yearCtrl = new FormControl(this.year);
  monthCtrl = new FormControl(this.month);
  dayCtrl = new FormControl(this.day);

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
  }

  // we use to do this kind of thing to react to
  ngOnInit() {
    this.calendar.valueChanges.subscribe(() => {
      this.updateDays();
    })
  }
  daysInMonth = 0;
  days: number[] = [];

  updateDays() {
    this.daysInMonth = dayjs(`${this.$.year()}-${this.$.month()}-01`).daysInMonth();
    this.days = new Array(this.daysInMonth).fill(0).map((_, i) => i + 1);
  }

  @Output() change = new EventEmitter<string>();

  date = computed(() => {
    return `${this.$.year()}-${this.$.month()}-${this.$.day()}`;
  });
}
