import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { SectionComponent } from './feature/section/section.component';
import { CategoriesComponent } from './feature/categories/categories.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'section', pathMatch: 'full' },
      {
        path: 'section',
        component: SectionComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import('./feature/section/list/list.component').then(
                (mod) => mod.ListComponent
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./feature/section/create/create.component').then(
                (mod) => mod.CreateComponent
              ),
          },
        ],
      },
      {
        path: 'category',
        component: CategoriesComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './feature/categories/list-category/list-category.component'
              ).then((mod) => mod.ListCategoryComponent),
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './feature/categories/create-category/create-category.component'
              ).then((mod) => mod.CreateCategoryComponent),
          },
        ],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
