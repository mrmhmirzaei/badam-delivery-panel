import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private swUpdate: SwUpdate,  private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params['token']){
        localStorage.setItem('token', params['token'])
      }
  })
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((evt) => {
        setTimeout(() => {
          localStorage.removeItem('token');
          window.location.reload();
        }, 100);
      });

      this.swUpdate.checkForUpdate().then(() => {
        // noop
      }).catch((err) => {
        console.log('مشکل در اپدیت رایدا');
      });
    }
  }
  ngOnInit() {
    
 
  }
}
