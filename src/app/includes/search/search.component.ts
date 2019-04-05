import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';

interface User {
  cardId: number;
  uid: number;
  firstname: string;
  lastname: string;
  emnumber: number;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() input = 'defualt';
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();
  myControl = new FormControl();
  selected = '';
  options: User[] = [{
    cardId: 1,
    uid: 4311370891,
    firstname: 'محمد جواد',
    lastname : 'یاحقی',
    emnumber : 96111147154031,
  }];
  filteredOptions: Observable<object[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string = ''): object[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      // tslint:disable-next-line:max-line-length
      if (option.uid.toString().toLowerCase().includes(filterValue)) { return true; } else if (option.emnumber.toString().toLowerCase().includes(filterValue)) { return true; } else if (option.firstname.toString().toLowerCase().includes(filterValue)) { return true; } else if (option.lastname.toString().toLowerCase().includes(filterValue)) { return true; }
    });
  }

  select(object) {
    this.onSelect.emit(object);
    (document.getElementById('input') as HTMLInputElement).blur();
  }
}
