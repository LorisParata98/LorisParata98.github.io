import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: HomeComponent },
            // { path: 'projects', component: ProjectsComponent }
            { path: '**', redirectTo: 'home', pathMatch: 'full' }

        ]
    }
];
