import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionService } from '../../../core/service/section.service';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  sectionForm: any = new FormGroup({})

  private _fb = inject(FormBuilder)

  ngOnInit(): void {
    this.sectionForm = this._fb.group({
      section_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]]
    })
  }

  private _sectionService = inject(SectionService)

  onSubmit() {
    if (this.sectionForm.valid) {
      this._sectionService.createSection(this.sectionForm.value).subscribe({
        next: (resposne) => {
          console.log(resposne.message)
        },
        error: (err) => {
          console.error(err.error.error)
        },
        complete: () => {
          console.log('done')
        }
      })
    }
  }
}
