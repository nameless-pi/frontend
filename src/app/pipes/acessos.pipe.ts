import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acessos'
})
export class AcessosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value.length) {
      return 'Nenhuma';
    } else if (value.length > 5) {
      return value.length + ' salas';
    }

    let acessos = '[';
    for (let i = 0; i < value.length; i++) {
      if (i + 1 < value.length) {
        acessos += value[i].nome_sala + ', ';
      } else {
        acessos += value[i].nome_sala + ']';
      }
    }
    return acessos;
  }
}
