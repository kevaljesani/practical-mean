import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export default class ForgetPasswordComponent implements OnInit {

  
  fb = inject(FormBuilder)
  forgetForm !: FormGroup;
  authService = inject(AuthServiceService)

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])]
    })
  }

  forgetPassword(){
    this.authService.sendEmailService(this.forgetForm.value.email).subscribe({
      next:(res)=>{
        alert(res.message)
        this.forgetForm.reset()
      },error:(error)=>{
        alert(error.error.message)
      }
    })
  }


  cancel(){
    this.forgetForm.reset()
  }
}
