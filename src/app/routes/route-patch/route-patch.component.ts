import { Component, Injector, computed, effect, inject } from '@angular/core';
import { MockDataService } from '../../mock.data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormService, EmploymentComponent } from '@components';

@Component({
  selector: 'app-route-patch',
  standalone: true,
  imports: [ ReactiveFormsModule, EmploymentComponent ],
  templateUrl: './route-patch.component.html',
  styleUrl: './route-patch.component.scss'
})
export class RoutePatchComponent {
  service = inject(MockDataService);
  formService = inject(EmployeeFormService);

  first = this.formService.first;
  last = this.formService.last;
  email = this.formService.email;
  phone = this.formService.phone;
  employments = this.formService.employments;

  $ = {
    // passing an observable to a signal automatically subscribes to it
    data: toSignal(this.service.getData())
  }

  $$ = {
    // create selectors for your data slices
    first: computed(() => this.$.data()?.name.first),
    last: computed(() => this.$.data()?.name.last),
    contact: computed(() => this.$.data()?.contact),
  }

  injector = { injector: inject(Injector) };

  $$$ = {
    // react to data changes
    data: effect(() => {
      console.log(this.$.data());
      const employments = this.$.data()?.employments;
        // clear the form array
      this.formService.employments.clear();
      if (employments) {
        // create the required number of array items
        for (let i = 0; i < employments.length; i++) {
          this.formService.employments.push(
            this.formService.createEmployment()
          )
        }
        this.formService.form.patchValue(this.$.data() as any);
      }
    }, this.injector)
  }
}
