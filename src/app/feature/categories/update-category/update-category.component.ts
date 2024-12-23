import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SectionService } from '../../../core/service/section.service';
import { ISection } from '../create-category/create-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../core/service/category.service';

@Component({
  selector: 'app-update-category',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent implements OnInit {
  updateCategoryForm: FormGroup = new FormGroup({});

  private _fb = inject(FormBuilder);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.fetchSection();

    this.captureDataById();

    this.updateCategoryForm = this._fb.group({
      section_id: ['', [Validators.required]],
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
              section_id: response.section.sid,
              category_name: response.category_name,
            });
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('done');
          },
        });
      }
    });
  }

  sections!: ISection[];

  private _sectionService = inject(SectionService);

  fetchSection() {
    this._sectionService.getAllSections().subscribe({
      next: (response) => {
        this.sections = response;
      },
    });
  }

  onSubmit() {
    if (this.updateCategoryForm.valid && !!this.category_id) {
      this._categoryService
        .updateCategory(this.updateCategoryForm.value, this.category_id)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('done');
          },
        });
    }
  }

  private _router = inject(Router);

  onRedirect() {
    this._router.navigate(['category', 'list']);
  }
}
