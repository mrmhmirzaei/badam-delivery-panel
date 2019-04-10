import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
import { SocketService } from '../../services/global/socket.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

interface User {
  cardId: number;
  uid: number;
  firstname: string;
  lastname: string;
  emnumber: number;
  foods: string[];
  drinkings: string[];
  optionals: string[];

}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() input = 'defualt';
  @Input() udata: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();
  constructor(private socket: SocketService) {

  }
  myControl = new FormControl();
  selected = null;
  options: User[] = [];
  filteredOptions: Observable<object[]>;
  meals = [
    {
        name : 'ناهار',
        id : 1,
        enabled : true
    },
    {
      name : 'شام',
      id : 2,
      enabled : true
    },
    {
      name : 'صبحانه',
      id : 3,
      enabled : false
    },
    {
      name : 'سحری',
      id : 4,
      enabled : false
    },
    {
      name : 'افطاری',
      id : 5,
      enabled : false
    },
    ];

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    const u = this.udata;
    console.log(u);

    u.forEach(element => {
      this.options.push({
        cardId : element.uid,
        uid: element.uid,
        firstname: element.name,
        lastname: element.family,
        emnumber: element.uid,
        foods: ['غذای اصلی'],
        drinkings: [],
        optionals: [],

      });
    });

  }

  private _filter(value: string = ''): object[] {
    console.log(this.options);
    const filterValue = value.toString().toLowerCase();
    return this.options.filter(option => {
      // tslint:disable-next-line:max-line-length
      if (option.uid.toString().toLowerCase().includes(filterValue)) { return true; } else if (option.emnumber.toString().toLowerCase().includes(filterValue)) { return true; } else if (option.firstname.toString().toLowerCase().includes(filterValue)) { return true; } else if (option.lastname.toString().toLowerCase().includes(filterValue)) { return true; }
    });
  }

  select(object) {
    console.log(object);
    this.onSelect.emit(object);
  }
  NewDeliver() {
    if (this.selected.length === 10) {
      this.socket.socket.emit('deliver', {
        card: false,
        meal: 2,
        uid: this.selected,
      });
    }
  }

  displayFn(user: User) {
    if (user) { return user.uid; }
  }
}


