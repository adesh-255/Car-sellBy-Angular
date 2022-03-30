import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
title = 'CarSell';
Author = 'Bienvenue Adeshina';
  constructor() { }

  ngOnInit(): void {
  }
  getAuthor():String {
    return this.Author;
  }

}
