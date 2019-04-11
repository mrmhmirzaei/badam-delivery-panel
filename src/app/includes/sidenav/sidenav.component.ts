import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material';
import { FreeFoodComponent } from '../../dialogs/free-food/free-food.component';
import { FreeFoodStudentComponent } from '../../dialogs/free-food-student/free-food-student.component';

import { SocketService } from '../../services/global/socket.service';

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
  public meal = null;
  public foods: User[] = [
    {
      name: 'غذای اصلی',
      all: 0,
      deliveried: 0
    }
  ];
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
  constructor(private dialog: MatDialog, private socket: SocketService) { }

  ngOnInit() {
    if (localStorage.token) {

      this.socket.socket.on('deliverstats', (data) => {
        console.log(data);
        this.foods[0].all = Number(data.all);
        this.foods[0].deliveried = Number(data.delivered);
        this.chart.data.datasets[1].data[0] = this.foods[0].all;
        this.chart.data.datasets[2].data[0] = this.foods[0].deliveried;

        this.chart.update();

      });

      this.socket.socket.on('delivered', (data) => {
        if (data.delivered) {
          this.foods[0].deliveried = this.foods[0].deliveried + 1;
          this.chart.data.datasets[2].data[0] = this.foods[0].deliveried;

          this.chart.update();
        }
      });

    }
    this.loadChart();
  }

  loadChart() {
    function createArray(length = 0, value = null) {
      return Array.from(Array(length), () => value);
    }

    const labels = this.foods.map(food => food.name);
    const all = { label: 'آمار کل', data: this.foods.map(food => food.all), backgroundColor: createArray(labels.length, '#3f51b5') };
    // tslint:disable-next-line:max-line-length
    const deliveried = { label: 'آمار تحویل', data: this.foods.map(food => food.deliveried), backgroundColor: createArray(labels.length, '#e91e63') };
    this.chart = new Chart((document.getElementById('canvas') as HTMLCanvasElement).getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [all, deliveried]
      },
      options: {
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  freeFood(index) {
    this.dialog.open(FreeFoodComponent, { data: { max: this.foods[index].all - this.foods[index].deliveried } })
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

  change() {
    this.socket.socket.emit('Selectmeal', this.meal);
    localStorage.removeItem(`studentData_`);
  }

}
