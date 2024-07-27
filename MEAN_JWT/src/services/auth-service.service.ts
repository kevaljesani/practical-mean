import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { api_urls } from '../utils/Constance';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    http=inject(HttpClient)
    isLoggedIn$ = new BehaviorSubject<Boolean>(false);
 
    registerService(registerObj:any){
      return this.http.post<any>(`${api_urls.authServiceApi}user/signup`,registerObj);
    }

    loginService(loginObj:any){
      return this.http.post<any>(`${api_urls.authServiceApi}/user/login`,loginObj);
    }

    sendEmailService(email:string){
      return this.http.post<any>(`${api_urls.authServiceApi}send-email`,{email:email})
    }

    resetPasswordService(resetObj:any){
      return this.http.post<any>(`${api_urls.authServiceApi}reset-password`,{resetObj})
    }

    isLogin(){
      return !!localStorage.getItem('user_id')
    }
}
