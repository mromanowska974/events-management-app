import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { UserService } from '../services/user.service';

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
export class MainPageComponent implements OnInit{
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.activeUser.subscribe(user => {
      console.log(user)
    })
  }

}
