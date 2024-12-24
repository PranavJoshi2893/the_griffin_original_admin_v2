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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup = new FormGroup({});

  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.fetchDataById();

    this.updateUserForm = this._fb.group({
      first_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required]],
    });
  }

  user_id!: string | null;
  private _route = inject(ActivatedRoute);

  private _userService = inject(UserService);

  fetchDataById() {
    this._route.paramMap.subscribe((param: ParamMap) => {
      this.user_id = param.get('id');
      if (!!this.user_id) {
        this._userService.getUser(this.user_id).subscribe({
          next: (response) => {
            this.updateUserForm.patchValue(response);
          },
          error: (err) => {
            this.openSnackBar(err.error.error, 2000);
          },
        });
      }
    });
  }

  onSubmit() {}

  private _router = inject(Router);
  onRedirect() {
    this._router.navigate(['user', 'list']);
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }
}
