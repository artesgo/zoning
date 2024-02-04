import { Component, Input } from '@angular/core';
import { EmploymentGroup } from '../services/employee.form.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employment.component.html',
  styleUrl: './employment.component.scss'
})
export class EmploymentComponent {
  @Input({ required: true }) employment: EmploymentGroup | undefined;

  get company()  {
    return this.employment?.controls.company as FormControl<string>;
  }
  get start()  {
    return this.employment?.controls.start as FormControl<string>;
  }
  get end()  {
    return this.employment?.controls.end as FormControl<string>;
  }
}
