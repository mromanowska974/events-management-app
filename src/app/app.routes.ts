import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddEventComponent } from './add-event/add-event.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { PageContainerComponent } from './page-container/page-container.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'add-event', component: AddEventComponent
    },
    {
        path: 'page', 
        component: PageContainerComponent,
        children: [
            {
                path: 'main-page', component: MainPageComponent
            },
            {
                path: 'user-panel', component: UserPanelComponent
            }
        ]
    },
];
