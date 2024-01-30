import { Component, EventEmitter, Input, Output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { pad } from '../helper';

export type TimeChange = {
  hour: string;
  minute: string;
  second: string;
  formatted: string
}

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  @Input() hour = dayjs().hour();
  @Input() minute = dayjs().minute();
  @Input() second = dayjs().second();
  @Output() change = new EventEmitter<TimeChange>();
  hourCtrl = new FormControl(this.hour);
  minuteCtrl = new FormControl(this.minute);
  secondCtrl = new FormControl(this.second);
  $ = {
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
  date = computed(() => {
      return `${pad(this.$.hour())}:${pad(this.$.minute())}:${pad(this.$.second())}`;
  });
  dateChange$ = effect(() => {
    this.change.emit({
      hour: pad(this.$.hour()),
      minute: pad(this.$.minute()),
      second: pad(this.$.second()),
      formatted: this.date(),
    });
  });
}
