import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  static module(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }

  constructor() {
    
  }
   
  
  onClick(mostra_menu_home) { 
    HomeComponent.module('home-menu', []).controller('mostraAba', ['$scope', function ($scope) {
    //  $scope.escondeAba = false;
      $scope.escondeAba = function(){
        return $scope.escondeAba ? true : false;
      };
    }]);
   }
  
  ngOnInit() {
    
    
  }
  
}
