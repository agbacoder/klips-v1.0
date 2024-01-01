import { group } from "@angular/animations";
import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(contolName: string, matchingControlName: string): ValidatorFn{ 

        return (grp: AbstractControl): ValidationErrors | null => {
            const control = grp.get('password')
            const matchingControl = grp.get('confirm_password')
    
            if(!control || !matchingControl){
                console.error("form control not found")
                return { controlNotFound: false}
            }
        
            const error = control.value === matchingControl.value? null: { noMatch: true}
    
            matchingControl.setErrors(error)

            return error
        }
       
    }

}
