
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pollutionLevel',
  standalone: true
})
export class PollutionLevelPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 20) {
      return 'Faible';
    }

    if (value <= 50) {
      return 'Modérée';
    }

    if (value <= 100) {
      return 'Élevée';
    }

    return 'Dangereuse';
  }
}
