import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  
  constructor(private authService:AuthService
    ,private router:Router) {
    
    
   }

    get getUserName():string{
     let userInfo = this.authService.getCurrentUser();
    if(userInfo!=null)
    {
      return userInfo.name;
    }
    else{
      return '';
    }
  }

   get isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }


  ngOnInit(): void {

  }

  onLogout():void{
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
