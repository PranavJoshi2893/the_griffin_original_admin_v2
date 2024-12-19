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
import { SectionService } from '../../../core/service/section.service';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../core/service/category.service';

interface ISection {
  sid: number;
  section_name: number;
}

@Component({
  selector: 'app-create-category',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: any = new FormGroup({});

  private _fb = inject(FormBuilder);

  private _sectionService = inject(SectionService);

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      section_id: ['', [Validators.required]],
      category_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
    });

    this.getSections();
  }

  sections!: ISection[];

  getSections() {
    this._sectionService.getAllSections().subscribe({
      next: (response) => {
        this.sections = response;
      },
    });
  }

  private _categoryService = inject(CategoryService);

  onSubmit() {
    if (this.categoryForm.valid) {
      this._categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (resposne) => {
          console.log(resposne);
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
}
