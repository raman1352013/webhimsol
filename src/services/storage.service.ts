import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public readonly KEY_TOKEN : any = "token";

  public readonly KEY_USER_DETAILS : any = "userDetail";
  public readonly KEY_USER_ROLEDESC : any = "roleDesc";
  
  public readonly KEY_MENU_LIST = "mList";
  
  public readonly KEY_FIR_SUB_MENU = "firSub";

  public readonly KEY_COMPLAINT_SUB_MENU = "comSub";

  set(key : any, val : any){
    sessionStorage.setItem(key, val);
  }

  get(key : any){
    return sessionStorage.getItem(key);
  }

}