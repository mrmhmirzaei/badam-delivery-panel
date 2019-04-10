import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data: object[] = [];
  public dataSource = new MatTableDataSource<object>();
  public Columns: string[] = ['name', 'code', 'food', 'drink', 'optional'];
  constructor() { }

  ngOnInit() {
    setInterval(() => {

      this.dataSource.data = this.data;
    }, 50);
  }


}
