
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightPollution]',
  standalone: true
})
export class HighlightPollution implements OnChanges {

  @Input() appHighlightPollution!: number;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    const indice = this.appHighlightPollution;
    let couleur: string;

    if (indice <= 20) {
      couleur = '#d4edda';
    } else if (indice <= 50) {
      couleur = '#fff3cd';
    } else if (indice <= 100) {
      couleur = '#ffe0b2';
    } else {
      couleur = '#f8d7da';
    }

    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      couleur
    );
  }
}
