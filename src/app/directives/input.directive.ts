import { Directive, ElementRef, OnInit } from '@angular/core';
import { Colors } from '../global/colors';

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const style = this.el.nativeElement.style;

    style.backgroundColor = Colors.beige;
    style.border = 'none';
    style.borderRadius = '10px 0px';
    style.boxShadow = 'inset 2px 2px 2px #bbbbbb';
    style.height = '25px';
  }
}
