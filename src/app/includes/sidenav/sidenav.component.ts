import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {MatDialog} from '@angular/material';
import { FreeFoodComponent } from '../../dialogs/free-food/free-food.component';
import { FreeFoodStudentComponent } from '../../dialogs/free-food-student/free-food-student.component';

interface User {

  name: string;
  all: number;
  deliveried: number;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  public chart: any;
  public foods: User[] = [
    {
      name: 'غذای اصلی',
      all: 456,
      deliveried: 0
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.loadChart();
    // setInterval(() => {
    //    this.foods.forEach((food, i) => {
    //      food.all = food.all + 1;
    //      this.chart.data.datasets[1].data[i] = food.all;
    //    });
    //    this.chart.update();
    // }, 3000);
    // setInterval(() => {
    //    this.foods.forEach((food, i) => {
    //      food.deliveried = food.deliveried + 1;
    //      this.chart.data.datasets[2].data[i] = food.deliveried;
    //    });
    //    this.chart.update();
    //  }, 7000);
  }

  loadChart() {
    function createArray(length= 0, value= null) {
      return Array.from(Array(length), () => value);
    }

    const labels = this.foods.map(food => food.name);
    const all = { label: 'آمار کل', data: this.foods.map(food => food.all), backgroundColor: createArray(labels.length, '#3f51b5')};
    // tslint:disable-next-line:max-line-length
    const deliveried = { label: 'آمار تحویل', data: this.foods.map(food => food.deliveried), backgroundColor: createArray(labels.length, '#e91e63')};
    this.chart = new Chart((document.getElementById('canvas') as HTMLCanvasElement).getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{label: '', data: [0]}, all, deliveried]
      },
      options: {
        tooltips: {
          enabled: true
        }
      }
    });
  }

  freeFood(index) {
    this.dialog.open(FreeFoodComponent, { data: { max : this.foods[index].all - this.foods[index].deliveried } })
    .afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  freeFoodStudent(index) {
    this.dialog.open(FreeFoodStudentComponent)
    .afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
