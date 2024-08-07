import { Component, inject } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ContainerDirective } from '../directives/container.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    WidgetDirective,
    ContainerDirective,

    FormsModule,
    CommonModule
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventService = inject(EventService);
  router = inject(Router);

  errorMsg = '';

  onSubmit(form: NgForm){
    if(form.form.valid){
      console.log(form.form.value)

      this.eventService.createEvent(form.form.value);
      this.onGoBack()
    }
    else {
      this.errorMsg = "Proszę wypełnić wszystkie wymagane pola."
    }
  }

  onGoBack(){
    this.router.navigate(['page', 'main-page'])
  }
}
