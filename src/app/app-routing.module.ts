import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ClipsComponent } from './components/clips/clips.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ClipService } from './services/clip.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'clip/:id',
    component: ClipsComponent,
    resolve: {
      clip: ClipService
    }
  },
  {
    path:'', 
    loadChildren: async () => (await import('./modules/video/video.module')).VideoModule
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
