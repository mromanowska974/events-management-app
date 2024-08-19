import { Component, inject, OnInit } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ContainerDirective } from '../directives/container.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { Event } from '../models/event';

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
  editedEvent: Event;
  today: any = new Date();

  ngOnInit(): void {
      if(this.router.url === '/edit-event'){
        this.editMode = true;
        this.editedEvent = JSON.parse(localStorage.getItem('event')!);
      }

      this.today = this.formatDate();
  }

  private formatDate(){
    let day = this.today.getDate() < 10 ? '0'+ this.today.getDate() : this.today.getDate();
    let month = this.today.getMonth() < 10 ? '0'+ (this.today.getMonth()+1) : this.today.getMonth()+1;
    let year = this.today.getFullYear();
    return year+'-'+month+'-'+day;
  }

  onSubmit(form: NgForm){
    if(form.form.valid){
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
