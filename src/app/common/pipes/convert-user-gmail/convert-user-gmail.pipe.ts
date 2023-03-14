import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUserGmail',
})
export class ConvertUserGmailPipe implements PipeTransform {
  transform(value: string, addGmail?: boolean, addOutlook?: boolean): string {
    if (addGmail) return value + '@gmail.com';
    else if (addOutlook) return value + '@outlook.com.vn';
    return value;
  }
}
