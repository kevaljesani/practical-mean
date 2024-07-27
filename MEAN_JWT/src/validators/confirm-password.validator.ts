import { FormGroup } from "@angular/forms"

export const confirmPasswordValidator = (controlName:string,controlNameToMatch:string)=>{
 return (formGrop:FormGroup)=>{
    let control = formGrop.controls[controlName]
    let controlToMatch = formGrop.controls[controlNameToMatch]
    if(controlToMatch.errors && !controlToMatch.errors['confirmPasswordValidator']){
        return
    }
    if(control.value !== controlToMatch.value){
        controlToMatch.setErrors({confirmPasswordValidator:true})
    }else{
        controlToMatch.setErrors(null)
    }
 }
}