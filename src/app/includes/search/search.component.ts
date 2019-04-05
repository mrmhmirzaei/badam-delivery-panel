import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() input:String = 'defualt';
  @Output() onSelect = new EventEmitter();
  myControl = new FormControl();
  options: Object[] = [{
    cardId: 1,
    uid: 4311370891,
    firstname: 'محمد جواد',
    lastname : 'یاحقی',
    emnumber : 96111147154031
  }];
  filteredOptions: Observable<Object[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string = ''): Object[] {

    console.log(value);
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      if(option['uid'].toString().toLowerCase().includes(filterValue)) return true;
      else if(option['emnumber'].toString().toLowerCase().includes(filterValue)) return true;
      else if(option['firstname'].toString().toLowerCase().includes(filterValue)) return true;
      else if(option['lastname'].toString().toLowerCase().includes(filterValue)) return true;
    });
  }

  select(object){
    this.onSelect.emit(object);
    (<HTMLInputElement> document.getElementById('input')).blur();
  }
}
