import { ComponentRef, EnvironmentInjector, inject, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  newModalComponent: ComponentRef<ModalComponent>;
  injector = inject(EnvironmentInjector)

  dataSub = new BehaviorSubject<any>(null)

  openModal(view: ViewContainerRef, content: TemplateRef<Element>) {
    view.clear();
    const innerContent = view.createEmbeddedView(content);

    this.newModalComponent = view.createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });
  }

  closeModal(view: ViewContainerRef){
    this.newModalComponent.destroy()
    view.clear();
  }
}
