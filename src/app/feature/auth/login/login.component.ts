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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
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

  private _router = inject(Router);

  onSubmit() {
    if (this.userForm.valid) {
      this._userService.loginUser(this.userForm.value).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 2000);
          this._userService.storeToken(response);
        },
        error: (err) => {
          this.openSnackBar(err.error.error, 2000);
        },
        complete: () => {
          this._router.navigate(['']);
        },
      });
    }
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }
}
