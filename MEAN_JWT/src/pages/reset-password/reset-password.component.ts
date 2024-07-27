import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export default class ResetPasswordComponent implements OnInit{
 
  fb = inject(FormBuilder)
  resetForm !: FormGroup
  activateRoute = inject(ActivatedRoute)
  router = inject(Router)
  authService = inject(AuthServiceService)
  token!:string;
  ngOnInit(): void {

    this.resetForm = this.fb.group({
      password: ['',Validators.required],
      confirmPassword:['',Validators.required]
    },{
      validator: confirmPasswordValidator('password','confirmPassword')
    })

    this.activateRoute.params.subscribe((val)=>{
      this.token= val['token']
    })
  }


  resetPassword() {
    let resetObj = {
        token: this.token, // Make sure this.token is properly set
        password: this.resetForm.value.password
    };

    this.authService.resetPasswordService(resetObj).subscribe({
        next: (res) => {
            alert(res.message);
            this.resetForm.reset();
            this.router.navigate(['login']);
        },
        error: (error) => {
            alert(error.error.message);
        }
    });
}


}
