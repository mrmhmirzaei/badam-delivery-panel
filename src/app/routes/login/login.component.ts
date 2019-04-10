import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/global/auth.service';
import {
  Router,

} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  public username = '';
  public password = '';
  public msg = '';
  ngOnInit() {
  }

  login() {


    this.msg = 'در حال ارسال';
    this.auth.login({
      username : this.username,
      password : this.password
    }).then((d) => {

      this.router.navigate(['/']);
    }).catch(() => {


      this.msg = 'خطا در ورود . لطفا ورودی را چک کنید';
    });
  }
}
