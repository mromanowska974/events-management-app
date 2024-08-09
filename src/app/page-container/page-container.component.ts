import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css'
})
export class PageContainerComponent{
  phrase: string = '';
}
