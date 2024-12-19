import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SectionService } from '../../../core/service/section.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  sectionForm: any = new FormGroup({});

  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.sectionForm = this._fb.group({
      section_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
    });
  }

  private _sectionService = inject(SectionService);
  private _snackBar = inject(MatSnackBar);

  onSubmit() {
    if (this.sectionForm.valid) {
      this._sectionService.createSection(this.sectionForm.value).subscribe({
        next: (resposne) => {
          this.openSnackBar(resposne.message, 2000);
        },
        error: (err) => {
          this.openSnackBar(err.error.error, 2000);
        },
        complete: () => {
          console.log('done');
        },
      });
    }
  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'close', { duration });
  }
}
