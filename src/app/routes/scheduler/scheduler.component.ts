import { AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarChange, CalendarComponent, HoursService } from '@components';
import dayjs from 'dayjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeesService } from '@components';
import { SvgCamera } from './camera.component';
import * as html2canvas from 'html2canvas-pro';
import { Options } from 'html2canvas-pro';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, CalendarComponent, SvgCamera],
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
  empService = inject(EmployeesService);
  employees = this.empService.employees;
  hoursService = inject(HoursService);
  startHours = this.hoursService.start;
  endHours = this.hoursService.end;
  screenshotTimer = signal(false);

  week = new Array(7).fill(dayjs());
  scheduler = new FormArray(
    new Array(28).fill(0).map(
      () =>
        new FormGroup({
          name: new FormControl(''),
          start: new FormControl(''),
          end: new FormControl(''),
        }),
    ),
  );
  onDate(data: CalendarChange) {
    // get first day of the week from selected date
    this.week = new Array(7).fill(0).map((_, i) =>
      dayjs(data.formatted)
        .startOf('week')
        .add(i + 1, 'day'),
    );
  }

  ngAfterViewInit(): void {
    this.patch();
  }

  patch() {
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

  clear(index: number) {
    for (let i = 0; i < 4; i++) {
      this.getName(i * 7 + index).setValue('');
      this.getStart(i * 7 + index).setValue('');
      this.getEnd(i * 7 + index).setValue('');
    }
  }

  capture() {
    this.screenshotTimer.set(true);
    setTimeout(() => {
      html2canvas.default(document.querySelector('#calendar') as HTMLElement).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'schedule.png';
        link.href = image;
        link.click();
        this.screenshotTimer.set(false);
        setTimeout(() => {
          this.patch();
        }, 0);
      });
    }, 500);
  }
}
