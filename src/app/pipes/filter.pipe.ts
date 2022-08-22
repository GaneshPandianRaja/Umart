import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], ...args: any[]): any[] {
    if (args[0] && args[1]) {
      const searchText = args[0].toLowerCase();
      return items.filter((item) =>{
        if (item[args[1]]) {
          return item[args[1]].toLowerCase().includes(searchText);
        }
        return false;
      });
    }
    return items;
  }

}
