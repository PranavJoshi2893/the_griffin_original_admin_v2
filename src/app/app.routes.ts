import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { SectionComponent } from './feature/section/section.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { UserComponent } from './feature/user/user.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
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
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './feature/section/update-section/update-section.component'
              ).then((mod) => mod.UpdateSectionComponent),
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
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './feature/categories/update-category/update-category.component'
              ).then((mod) => mod.UpdateCategoryComponent),
          },
        ],
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import('./feature/user/list-user/list-user.component').then(
                (mod) => mod.ListUserComponent
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./feature/user/create-user/create-user.component').then(
                (mod) => mod.CreateUserComponent
              ),
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import('./feature/user/update-user/update-user.component').then(
                (mod) => mod.UpdateUserComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'authentication',
    loadComponent: () =>
      import('./feature/auth/auth.component').then((mod) => mod.AuthComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./feature/auth/login/login.component').then(
            (mod) => mod.LoginComponent
          ),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
