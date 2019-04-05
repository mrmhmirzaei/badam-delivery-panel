import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data:Object[] = [];
  public dataSource = new MatTableDataSource<Object>();
  public Columns:String[] = ['name', 'code', 'food', 'drink', 'optional'];
  constructor() { }

  ngOnInit() {
    setInterval(()=>{
      this.dataSource.data = this.data;
    }, 1000)
  }
}
