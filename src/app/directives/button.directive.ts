import { Directive, ElementRef, OnInit } from '@angular/core';

import { Colors } from '../global/colors';

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const style = this.el.nativeElement.style;

    style.backgroundColor = Colors.darkRed;
    style.color = 'white';
    style.borderRadius = '10px';
    style.height = '30px';
    style.border = 'none';
    style.boxShadow = 'inset 2px 2px 5px #EE726B, inset -2px -2px 5px #821812'
  }
}
