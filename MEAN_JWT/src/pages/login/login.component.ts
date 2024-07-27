import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  fb = inject(FormBuilder)
  authService = inject(AuthServiceService)
  router = inject(Router)
  loginForm !: FormGroup;



  ngOnInit(): void {
    this.loginForm = this.fb.group({
     email:['',Validators.compose([Validators.email,Validators.required])],
     password:['',Validators.required],
    
    },
  )
   }


   login(){
      this.authService.loginService(this.loginForm.value).subscribe({
        next:(res)=>{
          alert("Login Success!!")
          localStorage.setItem('user_id',res.data._id)
          this.authService.isLoggedIn$.next(true)
          this.router.navigate(["home"]);
          this.loginForm.reset()
        },
        error:(error)=>{
          console.log("login error",error)
        }
      })
   }
}
