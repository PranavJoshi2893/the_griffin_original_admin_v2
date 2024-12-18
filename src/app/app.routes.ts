import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { SectionComponent } from './feature/section/section.component';
import { ListComponent } from './feature/section/list/list.component';
import { CreateComponent } from './feature/section/create/create.component';

export const routes: Routes = [
    { path: "", redirectTo: "", pathMatch: "full" },
    {
        path: "", component: DashboardComponent, children: [
            {
                path: "section", component: SectionComponent, children: [
                    { path: "list", component: ListComponent },
                    { path: "create", component: CreateComponent },
                ]
            }
        ]
    },
    { path: "**", component: PageNotFoundComponent }
];
