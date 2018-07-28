import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => console.log(user));
  }
}
