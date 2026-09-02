import { Routes } from '@angular/router';
import { seoGuard } from './guards/seo.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent,
          ),
        data: {
          title: 'Home',
          description:
            'Portfolio di Loris Parata, designer e sviluppatore web. Progetto e realizzo applicazioni web e mobile curando esperienza utente, interfaccia e implementazione.',
        },
        canActivate: [seoGuard],
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./components/projects/projects.component').then(
            (m) => m.ProjectsComponent,
          ),
        data: {
          title: 'Progetti',
          description:
            'I progetti di Loris Parata: case study di design e sviluppo di applicazioni web e mobile, dal problema alla soluzione.',
        },
        canActivate: [seoGuard],
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
