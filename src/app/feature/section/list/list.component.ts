import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from '../../../core/service/section.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface ISection {
  sid: number;
  section_name: number;
}

@Component({
  selector: 'app-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'section_name', 'edit', 'delete'];

  dataSource!: ISection[];
  private _sectionService = inject(SectionService);

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this._sectionService.getAllSections().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
    });
  }

  private _router = inject(Router);
  createSection() {
    this._router.navigate(['section', 'create']);
  }

  redirectTo(id: number) {
    this._router.navigate(['section', 'update', id]);
  }

  onDelete(id: number) {
    this._sectionService.deleteSection(id).subscribe({
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
