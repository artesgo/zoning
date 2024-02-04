import { Injectable, inject } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

export type EmploymentGroup = FormGroup<{
  company: FormControl<string | null>;
  start: FormControl<string | null>;
  end: FormControl<string | null>;
}>

@Injectable({
  providedIn: 'root'
}) export class EmployeeFormService {
  fb = inject(FormBuilder);
  //#region controls
  first = new FormControl('');
  last = new FormControl('');
  middle = new FormControl('');

  age = new FormControl(0);

  street = new FormControl('');
  city = new FormControl('');
  state = new FormControl('');
  zip = new FormControl('');

  phone = new FormControl('');
  email = new FormControl('');
  //#endregion

  //#region form fragments
  name = new FormGroup({
    first: this.first,
    last: this.last,
    middle: this.middle
  });

  address = new FormGroup({
    street: this.street,
    city: this.city,
    state: this.state,
    zip: this.zip
  });

  contact = new FormGroup({
    phone: this.phone,
    email: this.email
  });

  createEmployment() {
    return this.fb.group({
      company: this.fb.control(''),
      start: this.fb.control(''),
      end: this.fb.control(''),
    })
  }
  employments: FormArray<EmploymentGroup> = this.fb.array([] as EmploymentGroup[]);
  //#endregion

  //#region global form
  form = new FormGroup({
    name: this.name,
    age: this.age,
    address: this.address,
    contact: this.contact,
    employments: this.employments
  });
  //#endregion
}