import { Pipe, PipeTransform } from '@angular/core';

import { EventInfo } from '../../classes/event-info';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(events: EventInfo[], searchedText: string) {
    let results = events.filter(event => event.name.toLowerCase().indexOf(searchedText) !== -1);
    if(results.length === 0)
      return [-1];
    else
      return results;
  }

}
