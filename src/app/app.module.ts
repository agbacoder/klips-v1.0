import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { NavComponent } from './components/nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment.development';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { ClipsComponent } from './components/clips/clips.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { ClipsListComponent } from './components/clips-list/clips-list.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { FbtimestampPipe } from './pipes/fbtimestamp.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ClipsComponent,
    NotfoundComponent,
    ClipsListComponent,
    AboutComponent,
    HomeComponent,
    FbtimestampPipe
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
