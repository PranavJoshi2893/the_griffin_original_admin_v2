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
import { SectionService } from '../../../core/service/section.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-section',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './update-section.component.html',
  styleUrl: './update-section.component.css',
})
export class UpdateSectionComponent implements OnInit {
  updateSectionForm: FormGroup = new FormGroup({});

  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.fetchDataById();

    this.updateSectionForm = this._fb.group({
      section_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
    });
  }

  private _sectionService = inject(SectionService);

  section_id!: string | null;

  fetchDataById() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.section_id = params.get('id');
      if (!!this.section_id) {
        this._sectionService.getSectionById(this.section_id).subscribe({
          next: (response) => {
            this.updateSectionForm.patchValue(response);
          },
          error: (err) => {
            this.openSnackBar(err.error.error, 2000);
          },
        });
      }
    });
  }

  private _fb = inject(FormBuilder);

  onSubmit() {
    if (this.updateSectionForm.valid && !!this.section_id) {
      this._sectionService
        .updateSection(this.updateSectionForm.value, this.section_id)
        .subscribe({
          next: (response) => {
            this.openSnackBar(response.message, 2000);
          },
          error: (err) => {
            this.openSnackBar(err.error.error, 2000);
          },
          complete: () => {
            this._router.navigate(['section', 'list']);
          },
        });
    }
  }

  private _router = inject(Router);
  onRedirect() {
    this._router.navigate(['section', 'list']);
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }
}
