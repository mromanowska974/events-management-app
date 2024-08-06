import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavbarComponent,
    EventCardComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
