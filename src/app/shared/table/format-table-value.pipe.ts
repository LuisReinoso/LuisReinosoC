import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTableValue',
  standalone: true,
})
export class FormatTableValuePipe implements PipeTransform {
  transform(value: string | Date): unknown {
    if (value instanceof Date) {
      return value.toLocaleDateString('es-EC');
    }
    return String(value);
  }
}
