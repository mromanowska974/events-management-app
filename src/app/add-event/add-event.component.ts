import { Component, inject, OnInit } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ContainerDirective } from '../directives/container.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
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
export class AddEventComponent implements OnInit{
  eventService = inject(EventService);
  location = inject(Location);
  router = inject(Router);

  errorMsg = '';
  editMode: boolean = false;
  editedEvent: any;

  ngOnInit(): void {
      if(this.router.url === '/edit-event'){
        this.editMode = true;
        this.editedEvent = JSON.parse(localStorage.getItem('event')!);
      }

      console.log(this.editMode)
  }

  onSubmit(form: NgForm){
    if(form.form.valid){
      console.log(form.form.value)

      if(this.editMode){
        this.editedEvent = {
          ...this.editedEvent,
          name: form.form.value.name,
          date: form.form.value.date,
          access: form.form.value.access,
          description: form.form.value.description,
          place: form.form.value.place,
          membersAmount: form.form.value.membersAmount,
        }
        localStorage.setItem('event', JSON.stringify(this.editedEvent));
        this.eventService.editEvent(form.form.value, this.editedEvent.id)
      }
      else {
        this.eventService.createEvent(form.form.value);
      }
      this.onGoBack()
    }
    else {
      this.errorMsg = "Proszę wypełnić wszystkie wymagane pola."
    }
  }

  onGoBack(){
    this.location.back();
  }
}
