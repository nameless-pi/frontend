import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acessos'
})
export class AcessosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value.legth) {
      return 'Nenhuma';
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
