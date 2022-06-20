import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  loadProduct(){
    this.router.navigate(['products'])
  }
  login(){
    this.authService.login()
  }
  logout(){
    this.authService.logout()
  }
}
