import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
import { toPersianChars } from 'persian-tools';

import { SocketService } from '../../services/global/socket.service';
import { XlsxService } from '../../services/global/xlsx.service';
import { containsTree } from '@angular/router/src/url_tree';


interface User {
  cardId: number;
  uid: number;
  card: string;
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
export class SearchComponent implements OnInit, OnChanges {
  @Input() input = 'defualt';
  @Input() udata: any;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();
  constructor(private socket: SocketService, private xlsx: XlsxService) {

  }
  myControl = new FormControl();
  selected = null;
  options: User[] = [];
  exportuser = [];
  filteredOptions: Observable<object[]>;
  meals = [
    {
      name: 'ناهار',
      id: 1,
      enabled: true
    },
    {
      name: 'شام',
      id: 2,
      enabled: true
    },
    {
      name: 'صبحانه',
      id: 3,
      enabled: false
    },
    {
      name: 'سحری',
      id: 4,
      enabled: false
    },
    {
      name: 'افطاری',
      id: 5,
      enabled: false
    },
  ];

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );





  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'udata') {
        const u = this.udata;
        console.log(u);
        this.options = [];
        this.exportuser =  this.groupBy(this.udata, 'place');
        u.forEach(element => {
      this.options.push({
        cardId: element.uid,
        uid: element.uid,
        card : element.card,
        firstname: toPersianChars(element.name),
        lastname: toPersianChars(element.family),
        emnumber: element.uid,
        foods: ['غذای اصلی'],
        drinkings: [],
        optionals: [],

      });
    });
      }
    }

  }

  private _filter(value: string = ''): object[] {
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

  exportData() {
    const transkey = [{
      name: 'نام خانوادگی',
      code: 'family'
    },
    {
      name: 'نام',
      code: 'name'
    }, {
      name: 'کد ملی',
      code: 'IDNumber'
    }, {
      name: 'شناسه یکتا',
      code: 'uid'
    }, {
      name: 'محل تحویل',
      code: 'place'
    }, {
      name: 'شناسه دانشجویی',
      code: 'EmployeeNumber'
    }
    ];
    console.log(this.udata);
    Object.keys(this.exportuser).forEach(element => {
      this.xlsx.exportAsExcelFile(this.ObjectTranslator(this.exportuser[element] , transkey), element );
    });
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
  groupBy(arr, criteria) {
    return arr.reduce( (obj, item) => {
      // Check if the criteria is a function to run on the item or a property of it
      const key = typeof criteria === 'function' ? criteria(item) : item[criteria];
      // If the key doesn't exist yet, create it
      if (!obj.hasOwnProperty(key)) {
        obj[key] = [];
      }
      // Push the value to the object
      obj[key].push(item);
      // Return the object to the next item in the loop
      return obj;
    }, {});
  }
  ObjectTranslator(Objects, kt) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < Objects.length; i++) {
      Object.keys(Objects[i]).forEach((item, index) => {

        kt.forEach((x) => {
          if (x.code === item) {
            Object.defineProperty(Objects[i], x.name,
            Object.getOwnPropertyDescriptor(Objects[i], x.code));
            delete Objects[i][x.code];
          }
        });

      });
    }



    return Objects;
  }
}


