import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HoursService } from './hours.service';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.scss',
})
export class HoursComponent {
  hoursService = inject(HoursService);
  start = new FormControl('');
  end = new FormControl('');
  startHours = this.hoursService.start;
  endHours = this.hoursService.end;
  enterStart() {
    if (this.start.value) {
      this.startHours.set([...this.startHours(), this.start.value]);
    }
  }
  enterEnd() {
    if (this.end.value) {
      this.endHours.set([...this.endHours(), this.end.value]);
    }
  }
  removeStart(name: string) {
    this.startHours.set(this.startHours().filter((e) => e !== name));
  }
  removeEnd(name: string) {
    this.endHours.set(this.endHours().filter((e) => e !== name));
  }
}
