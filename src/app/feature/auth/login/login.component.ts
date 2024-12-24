import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../core/service/user.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.userForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private _userService = inject(UserService);

  onSubmit() {
    if (this.userForm.valid) {
      this._userService.loginUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (err) => {
          console.log(err.error.error);
        },
        complete: () => {
          console.log('done');
        },
      });
    }
  }
}
