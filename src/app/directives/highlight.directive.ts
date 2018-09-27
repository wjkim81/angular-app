// import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
 
  // constructor(private el: ElementRef) { }
 
  // @Input() defaultColor: string;
 
  // @Input('appHighlight') highlightColor: string;
 
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight(this.highlightColor || this.defaultColor || 'red');
  // }
 
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight(null);
  // }
 
  // private highlight(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
  }
}