import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horarios'
})
export class HorariosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.length;
  }

}
