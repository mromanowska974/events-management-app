import { Component, inject, OnInit } from '@angular/core';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { InputDirective } from '../directives/input.directive';
import { ButtonDirective } from '../directives/button.directive';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    InputDirective,
    ButtonDirective,

    CommonModule
  ],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent implements OnInit{
  navigationService = inject(NavigationService);
  chatService = inject(ChatService);

  chats$: Observable<Chat[]>;

  ngOnInit(): void {
      this.navigationService.setActivePage('chats')

      this.chats$ = this.chatService.chats$;
  }
}
