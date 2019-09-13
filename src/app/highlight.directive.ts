import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'wild');
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText('Hey there!');

    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.el.nativeElement, div);
  }

}
