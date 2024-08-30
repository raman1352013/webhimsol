import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  //userSearchTypeOptions : any = [{key:"m",val:"Mobile"}, {key:"u",val:"User Name"}, {key:"e",val:"Email"}];
  userSearchTypeOptions: any = [
    { key: 'm', val: 'Mobile' },
    { key: 'u', val: 'User Name' },
  ];

  emailRegex: any = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  mobileRegex: any = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  constructor(private toaster: ToastrService) {}

  showInfo(title: any, msg: any) {
    this.toaster.info(msg, title, {
      positionClass: 'toast-bottom-right',
      // positionClass: 'toast-top-right',
      closeButton: true,
    });
  }

  showSuccess(title: any, msg: any) {
    this.toaster.success(msg, title, {
      positionClass: 'toast-bottom-right',
      // positionClass: 'toast-top-right',
      closeButton: true,
    });
  }

  showWarning(title: any, msg: any) {
    this.toaster.warning(msg, title, {
      positionClass: 'toast-bottom-right',
      // positionClass: 'toast-top-right',
      closeButton: true,
    });
  }

  showError(msg: any) {
    this.toaster.error(msg, 'Error!', {
      positionClass: 'toast-bottom-right',
      // positionClass: 'toast-top-right',
      closeButton: true,
    });
    return false;
  }

  overlay = function (type: any) {
    let loader = document.getElementById('loading') as HTMLElement;
    if (type == 's') {
      loader.style.display = 'block';
    } else {
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1000);
    }
  };

  isSuccess(msg: any) {
    return msg == 'Success';
  }

  showRanges(role: any) {
    return role == 'IG' || role == 'DIG' || role == 'SP' || role == 'SHO';
  }

  showPs(role: any) {
    return role == 'SP' || role == 'SHO';
  }

  getUserSearchOptions() {
    return this.userSearchTypeOptions;
  }

  isValidEmail(email: any) {
    return this.emailRegex.test(email);
  }

  isValidMobile(mobile: any) {
    return this.mobileRegex.test(mobile);
  }

  public formatToDateInput(d: any) {
    d = new Date(d);
    let month: any = d.getMonth();
    if (month <= 9) {
      month = '0' + month;
    }
    let date: any = d.getDate();
    if (date <= 9) {
      date = '0' + date;
    }
    return d.getFullYear() + '-' + month + '-' + date;
  }
}
