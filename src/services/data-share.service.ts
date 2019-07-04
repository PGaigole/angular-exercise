import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*A generic service that can share data between two sibling components*/
@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private data_source = new BehaviorSubject({data: 'default'});
  current_data = this.data_source.asObservable();

  constructor() { }

  changeData(input: any){
    this.data_source.next(input);
  }
}
