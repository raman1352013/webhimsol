import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Messages {

  public static readonly TITLE_INFO = "Info!";

  public static readonly ERROR_INVALID_USERNAME = "Please enter valid username";
  public static readonly ERROR_USERNAME_TOO_SHORT = "Please enter valid username ! username too short";
  public static readonly ERROR_USERNAME_CONTAINS_INVALID_CHARACTERS = "Username cannot contain any special characters";
  public static readonly ERROR_USERNAME_SPECIAL_CHARS = "Username cannot contain Special Characters";
  public static readonly ERROR_INVALID_PASSWORD_COMPLEXITY = "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.";
  

  public static readonly ERROR_CAPTCHA_NOT_SELECTED = "Please select Captcha";
  public static readonly ERROR_FILL_ALL_FIELDS = "Please fill all the required fields";
  public static readonly ERROR_ACCEPT_TERMS = "Please Accept Terms";
  

  
  public static readonly SUCCESS_RESET_PASSWORD = "Your Password has been Reset Successfully.Kindly Login";

  public static readonly SUCCESS_FORGOT_PASS_LINK_SENT = " Reset Password link sent to your registered email.";
  
 
  

  public static readonly ERROR_INVALID_RANGE = "Please enter valid range";
  public static readonly ERROR_INVALID_PS = "Please enter valid Police Station";


  public static readonly ERROR_INVALID_PASSWORD = "Please enter valid password";

  public static readonly ERROR_ROLE_NOT_SELECTED = "Please select user role";

  public static readonly ERROR_PASSWORD_NOT_MATCHING = "Password and Confirm password are not matching";

  public static readonly ERROR_INVALID_NAME = "Please enter valid name";
  public static readonly ERROR_NAME_TOO_SHORT = "Please enter valid name ! name too short";

  public static readonly ERROR_INVALID_CONFIRM_PASSWORD = "Please enter valid confirm password";
  public static readonly ERROR_SHORT_PASSWORD = "Please enter valid  password! Password too short";
  public static readonly ERROR_SEARCH_BY_NOT_SELECTED = "Please select search by";

  public static readonly ERROR_INVALID_SEARCH_VALUE = "Please enter valid value in search value";

  public static readonly ERROR_INVALID_MOBILE = "Please enter valid mobile number";

  public static readonly ERROR_INVALID_EMAIL = "Please enter valid email";
  public static readonly ERROR_NAME_CONTAINS_DIGITS = "Name cannot contain digits or specail characters";
  
  public static readonly SOMETHING_WENT_WRONG = "Something Went wrong.Please try again or contact System Admin";
  public static readonly NO_DATA_FOUND = "No data found for given search";

  public static readonly STATUS_CHANGED_SUCCESSFULLY = "Status changed successfully";
  
  public static readonly USER_INFO_SAVED_SUCCESSFULLY = "User info saved successfully";
  
  
  public static readonly ERROR_NAME_IS_TOO_SHORT = "Name too short";
  
  public static readonly ERROR_NAME_CONTAINS_INVALID_CHARACTERS = "Name cannot contain any Digits or Special Characters";
  


}
