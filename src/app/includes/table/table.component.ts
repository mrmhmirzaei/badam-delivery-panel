import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data:Object[] = [];
  public Columns:String[] = ['name', 'code', 'food', 'drink', 'optional'];
  constructor() { }

  ngOnInit() {}
}
