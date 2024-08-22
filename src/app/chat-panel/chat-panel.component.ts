import { Component, inject, OnInit } from '@angular/core';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { InputDirective } from '../directives/input.directive';
import { ButtonDirective } from '../directives/button.directive';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';
import { ChatService } from '../services/chat.service';
import { map, Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { FormsModule } from '@angular/forms';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    InputDirective,
    ButtonDirective,

    CommonModule,
    FormsModule
  ],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent implements OnInit{
  navigationService = inject(NavigationService);
  chatService = inject(ChatService);

  chats$: Observable<Chat[]>;
  selectedChat: Chat;
  currentMessage: string = '';
  messages$: Observable<Message[]>;

  activeUserUid = localStorage.getItem('uid');

  ngOnInit(): void {
      this.navigationService.setActivePage('chats')

      this.chats$ = this.chatService.chats$;
  }

  onSelectChat(chat: Chat){
    this.selectedChat = chat;
    this.messages$ = this.chatService.getChatMessages$(this.selectedChat.id);
  }

  onSendMessage(){
    if(this.selectedChat && this.currentMessage){
      this.chatService.sendMessage(this.selectedChat.id, this.currentMessage)
      this.currentMessage = '';
    }
  }
}
