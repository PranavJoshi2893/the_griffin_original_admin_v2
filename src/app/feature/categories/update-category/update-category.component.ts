import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../core/service/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-category',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent implements OnInit {
  updateCategoryForm: FormGroup = new FormGroup({});

  private _fb = inject(FormBuilder);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.captureDataById();

    this.updateCategoryForm = this._fb.group({
      category_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
    });
  }

  category_id!: string | null;

  private _categoryService = inject(CategoryService);
  captureDataById() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.category_id = params.get('id');
      if (!!this.category_id) {
        this._categoryService.getCategoryById(this.category_id).subscribe({
          next: (response) => {
            this.updateCategoryForm.patchValue({
              category_name: response.category_name,
            });
          },
          error: (err) => {
            this.openSnackBar(err.error.error, 2000);
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.updateCategoryForm.valid && !!this.category_id) {
      this._categoryService
        .updateCategory(this.updateCategoryForm.value, this.category_id)
        .subscribe({
          next: (response) => {
            this.openSnackBar(response.message, 2000);
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
