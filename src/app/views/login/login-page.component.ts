import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '@apis/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginService, fb: FormBuilder) {
    this.loginForm = fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  login() {
    let rs = this.loginForm.value;
    this.loginService.login({ userName: rs.userName, passWord: rs.passWord });
  }
}
