import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from '../../../core/service/section.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  private _sectionService = inject(SectionService);


  ngOnInit(): void {
    this.fetchList()
  }

  fetchList() {
    this._sectionService.getAllSections().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
