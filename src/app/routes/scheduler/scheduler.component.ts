import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, CalendarComponent ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent {

}
