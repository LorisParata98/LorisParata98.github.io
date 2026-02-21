import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { titleGuard } from './guards/title.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' },
        canActivate: [titleGuard],
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: { title: 'Projects' },
        canActivate: [titleGuard],
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
