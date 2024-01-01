import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import  IUser  from '../models/user.model'
import { Observable, of } from 'rxjs';
import {  delay, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<Boolean>
  
  public redirect = false;
  
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router, private routes: ActivatedRoute) { 
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter ( e => e instanceof NavigationEnd),
      map(e => this.routes.firstChild), 
      switchMap( routes => routes?.data ?? of({authOnly: false}))
    ).subscribe((data) =>{
      this.redirect = data.authOnly ?? false;
    })
  
  }

  public async createUsers(userData: IUser){
  if (!userData.password){
   throw new Error("Password not provided!");
  
  }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string , userData.password as string
    )

    if (!userCred.user){
      throw new Error("User does not exist");
      
    }
    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })
    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
  public async logout($event?: Event){
    if ($event){
      $event.preventDefault();
    }
    await this.auth.signOut()
   
    await this.router.navigateByUrl('/')
    
  }

  


}
