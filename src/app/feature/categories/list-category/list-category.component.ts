import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/service/category.service';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface ICategory {
  pcid: number;
  category_name: string;
  parent_category_name: string;
}

@Component({
  selector: 'app-list-category',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css',
})
export class ListCategoryComponent implements OnInit {
  displayedColumns: string[] = [
    'sr_no',
    'category_name',
    'edit',
    'delete',
    'next_level',
  ];
  dataSource!: ICategory[];

  private _categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this._categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.dataSource = response.map((item: any) => ({
          pcid: item.pcid,
          category_name: item.category_name,
        }));
      },
    });
  }

  onDelete(id: number) {
    this._categoryService.deleteCategory(id).subscribe({
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

  private _router = inject(Router);

  createCategory() {
    this._router.navigate(['category', 'create']);
  }

  redirectTo(id: number) {
    this._router.navigate(['category', 'update', id]);
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }

  fetchDataById(id: string) {
    console.log(id);
    this._categoryService.getCategoryById(id).subscribe({
      next: (response) => {
        if (response.children.length !== 0) {
          this.dataSource = response.children;
        }
      },
      error: (err) => {
        console.log(err.error.error);
      },
    });
  }
}
