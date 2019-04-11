import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/global/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private snackbar:MatSnackBar) { }

  public username:String;
  public password:String;
  public logining:Boolean = false;
  ngOnInit() {}

  login() {
    if(this.logining == true) return;
    else if(this.username.length == 0) return this.snackbar.open('نام کاربری را وارد کنید.','بستن',{ duration: 3000 });
    else if(this.password.length == 0) return this.snackbar.open('رمز عبور را وارد کنید.','بستن',{ duration: 3000 });
    else{
      this.logining = true;
      this.auth.login({
        username: this.username,
        password: this.password
      }).then((d) => {
        this.snackbar.open('شما با موفقیت وارد شدید.','',{ duration: 3000 });
        this.router.navigate(['/']);
      }).catch(() => {
        this.logining = false;
        this.snackbar.open('لطفا ورودی ها را بررسی کنید.', 'بستن', { duration: 3000 });
      });
    } 
  }
}
