import { Directive, ElementRef, OnInit } from '@angular/core';
import { Colors } from '../global/colors';

@Directive({
  selector: '[appContainer]',
  standalone: true
})
export class ContainerDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const style = this.el.nativeElement.style;

    style.backgroundColor = Colors.beige;
    style.height = '100vh';
    style.display = 'flex';
    style.flexDirection = 'column';
    style.fontFamily = 'PTSans';
  }
}
