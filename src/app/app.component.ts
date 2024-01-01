import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'klips';
  showModal = true;

  constructor(public modal:ModalService, public auth: AuthService){

  }

  
}
