import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  authService = inject(AuthServiceService)
  isLoggedIn : boolean =false
  logOut(){
    this.authService.isLoggedIn$.next(false)
    localStorage.removeItem('user_id')
  }

  ngOnInit(): void {
   this.authService.isLoggedIn$.subscribe((res)=>{
     this.isLoggedIn = this.authService.isLogin();
   })
  }
}
