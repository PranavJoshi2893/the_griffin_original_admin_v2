import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.userForm = this._fb.group({
      first_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private _userService = inject(UserService);

  onSubmit() {
    if (this.userForm.valid) {
      this._userService.registerUser(this.userForm.value).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 2000);
        },
        error: (err) => {
          this.openSnackBar(err.error.error, 2000);
        },
        complete: () => {
          this._router.navigate(['user', 'list']);
        },
      });
    }
  }

  private _router = inject(Router);
  onRedirect() {
    this._router.navigate(['user', 'list']);
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }
}
