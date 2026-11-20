
import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightPollution } from './highlight-pollution';

describe('HighlightPollution', () => {
  let element: HTMLDivElement;
  let styles: string[];
  let directive: HighlightPollution;

  beforeEach(() => {
    element = document.createElement('div');
    styles = [];

    // Simule Renderer2 pour vérifier la couleur appliquée.
    const renderer = {
      setStyle: (
        _element: unknown,
        _property: string,
        value: string
      ) => {
        styles.push(value);
      }
    } as unknown as Renderer2;

    directive = new HighlightPollution(
      new ElementRef(element),
      renderer
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply the correct background color for each level', () => {
    const tests = [
      { indice: 0, couleur: '#d4edda' },
      { indice: 20, couleur: '#d4edda' },
      { indice: 21, couleur: '#fff3cd' },
      { indice: 50, couleur: '#fff3cd' },
      { indice: 51, couleur: '#ffe0b2' },
      { indice: 100, couleur: '#ffe0b2' },
      { indice: 101, couleur: '#f8d7da' },
      { indice: 150, couleur: '#f8d7da' }
    ];

    for (const test of tests) {
      directive.appHighlightPollution = test.indice;
      directive.ngOnChanges();

      expect(styles[styles.length - 1]).toBe(test.couleur);
    }
  });
});
