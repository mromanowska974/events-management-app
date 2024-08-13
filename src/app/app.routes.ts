import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddEventComponent } from './add-event/add-event.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { PageContainerComponent } from './page-container/page-container.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';

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
        path: 'edit-event', component: AddEventComponent
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
            },
            {
                path: 'details', component: EventDetailsComponent
            },
            {
                path: 'calendar', component: CalendarPageComponent
            },
            {
                path: 'notifications', component: NotificationPageComponent
            }
        ]
    },
];
