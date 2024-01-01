import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
 
  templateUrl: './login.component.html',
})
export class LoginComponent {

constructor(private auth: AngularFireAuth){

  }
credentials = {
    email: '',
    password: ''
  }

onLogin = false;

  
showAlert = false
alertMsg = 'You are being logged in!'
alertColor = 'blue'

async login(){
this.showAlert = true
this.alertMsg = 'You are being logged in!'
this.alertColor = 'blue'
this.onLogin = true;


 try {
  await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
   
 } catch (e) {
  
  this.alertMsg = this.alertMsg = 'An unexpected error occured. Please try again!'
    this.alertColor = 'red'
    this.onLogin = false
    return
 }

 this.alertMsg = 'Login successful!'
    this.alertColor = 'green'
}

}
