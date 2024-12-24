import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface IUser {
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-list-user',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = [
    'sr_no',
    'first_name',
    'last_name',
    'email',
    'edit',
    'delete',
  ];

  dataSource!: IUser[];

  private _userService = inject(UserService);

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this._userService.getUsers().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (err) => {
        this.openSnackBar(err.error.error, 2000);
      },
    });
  }

  private _router = inject(Router);

  createUser() {
    this._router.navigate(['user', 'create']);
  }

  redirectTo(id: string) {
    this._router.navigate(['user', 'update', id]);
  }

  onDelete(id: string) {
    this._userService.deleteUser(id).subscribe({
      next: (response) => {
        this.openSnackBar(response.message, 2000);
      },
      error: (err) => {
        this.openSnackBar(err.error.error, 2000);
      },
      complete: () => {
        this.fetchList();
      },
    });
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }
}
