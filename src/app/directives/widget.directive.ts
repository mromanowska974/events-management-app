import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appWidget]',
  standalone: true
})
export class WidgetDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
      const style = this.el.nativeElement.style;

      style.backgroundColor = 'white';
      style.borderRadius = '20px 0';
      style.boxShadow = '2px 2px 5px #bbbbbb'
  }
}
