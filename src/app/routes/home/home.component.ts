import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public options: FormGroup;
  public opened:Boolean = false;
  public mode:String = 'side';
  public mini:Boolean = false;
  public online:Boolean = false;
  public linestatus:Boolean = false;
  public search:Boolean = false;
  constructor(fb: FormBuilder,private  media: MediaMatcher) {
    this.options = fb.group({
      top: 0,
      bottom: 0,
      fixed: false,
    });
  }
  
  ngOnInit() {
    this.sidenavEvent();
    this.OnlineEvent();
  }
  
  sidenavEvent(){
    let query = this.media.matchMedia('(max-width: 1100px)');
    let Listener = ()=> {      
      if(query.matches == true) {
        this.opened = false;
        this.mini = true;
        this.mode = 'push';
      }
      else{
        this.opened = true;
        this.mini = false;
        this.mode = 'side';
      }
    };
    query.addListener(Listener);    
    Listener();
  }

  OnlineEvent(){
    window.onload = ()=>{
      if (navigator.onLine) {
        this.online = true;
        setTimeout(() => {
          this.linestatus = false;
        }, 3000);
      } else {
        this.linestatus = true;
        this.online = false;
      }
    }

    window.ononline = ()=> { this.online = true; setTimeout(()=>this.linestatus = false, 3000)}
    window.onoffline = ()=>{ this.linestatus = true; this.online = false; }
  }
  
  
}
