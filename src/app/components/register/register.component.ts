import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  users = [];
  currentIndex: any;
  isUpdate: boolean = false;

  genderType = [
    { id: "male", value: "Male" },
    { id: "female", value: "Female" }
  ];

  constructor(
    private _fb: FormBuilder,
    private _customValidator: CustomValidationService) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      company: ["", Validators.required],
      gender: ["", Validators.required],
      dateofbirth: ["", Validators.required],
      password: ["", Validators.compose([Validators.required, this._customValidator.patternValidator()])],
      confirmPassword: ["", [Validators.required]]
    },
      {
        validator: this._customValidator.MatchPassword('password', 'confirmPassword'),
      }
    )
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  allowNumbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != "0") {
      event.preventDefault();
    }
  }

  clearValues(){
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setErrors(null);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.table(this.registerForm.value);
      this.users.push(this.registerForm.value);
      this.clearValues();
    }
  }

  edit(user: any, index: any) {
    this.isUpdate = true;
    this.currentIndex = index;
    this.registerForm.setValue(user);
  }

  update() {
    this.users[this.currentIndex] = this.registerForm.value;
    this.isUpdate = false;
    this.clearValues();
  }

  delete(index: any) {
    this.users.splice(index, 1);
  }

}
