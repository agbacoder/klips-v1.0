import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MaskedLengthValidator } from 'src/app/services/validator.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent {

  @Input() control: FormControl = new FormControl()
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() format = '';

}
