import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../core/service/category.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-category',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: any = new FormGroup({});

  private _fb = inject(FormBuilder);

  categories!: any[];

  ngOnInit(): void {
    this.fetchCategories();
    this.categoryForm = this._fb.group({
      parent_category_id: [undefined],
      category_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
    });
  }

  fetchCategories() {
    this._categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }

  private _categoryService = inject(CategoryService);

  onSubmit() {
    if (this.categoryForm.valid) {
      this._categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (resposne) => {
          this.openSnackBar(resposne.message, 2000);
        },
        error: (err) => {
          this.openSnackBar(err.error.error, 2000);
        },
        complete: () => {
          this._router.navigate(['category', 'list']);
        },
      });
    }
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }

  private _router = inject(Router);

  onRedirect() {
    this._router.navigate(['category', 'list']);
  }
}
