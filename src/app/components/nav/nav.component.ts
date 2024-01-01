import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'

})
export class NavComponent implements OnInit{
  constructor(public modal: ModalService, public auth: AuthService){
   
  }
  ngOnInit(): void {
    
  }
  openModal($event: Event){
    $event.preventDefault()
    this.modal.toggleModal('auth');
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  
} 
 closeDropdown() {
  this.isDropdownOpen = false;

} 
 
}
