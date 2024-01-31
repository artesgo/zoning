import { AfterViewInit, Component, effect } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CalendarChange,
  CalendarComponent,
  EmployeesComponent,
} from '@components';
import dayjs from 'dayjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CalendarComponent,
    EmployeesComponent,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent implements AfterViewInit {
  time = false;
  month = 0;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  employees = JSON.parse(localStorage.getItem('employees') || '[]');

  week = new Array(7).fill(dayjs());
  scheduler = new FormArray(
    new Array(28).fill(0).map(
      () =>
        new FormGroup({
          name: new FormControl(''),
          start: new FormControl(''),
          end: new FormControl(''),
        })
    )
  );
  onDate(data: CalendarChange) {
    // get first day of the week from selected date
    this.week = new Array(7).fill(0).map((_, i) =>
      dayjs(data.formatted)
        .startOf('week')
        .add(i + 1, 'day')
    );
  }

  ngAfterViewInit(): void {
    const schedule = localStorage.getItem('scheduler');
    if (schedule) {
      this.scheduler.patchValue(JSON.parse(schedule));
    }
  }

  getControl(i: number) {
    return this.scheduler.controls[i];
  }

  getName(i: number) {
    return this.getControl(i).get('name') as FormControl<string>;
  }

  getStart(i: number) {
    return this.getControl(i).get('start') as FormControl<string>;
  }

  getEnd(i: number) {
    return this.getControl(i).get('end') as FormControl<string>;
  }

  save() {
    localStorage.setItem('scheduler', JSON.stringify(this.scheduler.value));
  }
  change = toSignal(this.scheduler.valueChanges, {
    initialValue: this.scheduler.value,
  });

  loaded = false;
  effect$ = effect(() => {
    this.change();
    if (this.loaded) {
      this.save();
    }
    this.loaded = true;
  });
}
