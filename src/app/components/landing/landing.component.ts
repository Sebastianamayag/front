import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.remove('bg-gradient-login');
    document.body.classList.remove('bg-gradient-regiter');
  }

  show() {
    let menu = document.querySelector("#menu");
    let toggleIcon = document.querySelector("#toggle-icon");
    toggleIcon.addEventListener("click", function () {
      menu.classList.toggle("menu-on");
    });
  }
}
