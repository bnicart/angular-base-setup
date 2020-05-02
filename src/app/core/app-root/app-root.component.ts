import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log('Logged In!');
    this.router.navigate(['/data']);
  }
}
