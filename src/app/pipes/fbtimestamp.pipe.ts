import { Pipe, PipeTransform } from '@angular/core';
import firebasse from 'firebase/compat/app'
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fbtimestamp',
})
export class FbtimestampPipe implements PipeTransform {


  constructor (private datePipe: DatePipe){

  }
  transform(value: firebasse.firestore.FieldValue | undefined){

    if (!value){
      return ''
    }
    const date = (value as firebasse.firestore.Timestamp).toDate();
    return this.datePipe.transform(date, 'medium');
  }

}
