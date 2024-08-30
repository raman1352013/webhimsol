import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService implements OnInit {
  //private readonly BASE_URL = "https://sandbox.techembryo.com/ess-gateway/";

  //public readonly POST_LOGIN = this.BASE_URL + "hpvig-users/api/user/v1/login";

 private readonly BASE_URL_PDMS = 'https://api.techembryo.com/hpceo-pdms/';
  private readonly BASE_URL_USERS = 'https://sandbox.techembryo.com/users/';
 private readonly BASE_URL_MASTER = 'https://api.techembryo.com/hpceo-master/';

  
  public readonly GET_TOKEN = this.BASE_URL_USERS + 'api/user/v1/token';

  public readonly POST_LOGIN = this.BASE_URL_USERS + 'api/user/v1/login';
  public readonly POST_V2_LOGIN = this.BASE_URL_USERS + 'api/user/v2/login';

  public readonly POST_FORGOT_PASS =
    this.BASE_URL_USERS + 'api/user/v2/forgot-password';
  public readonly POST_FORGOT_VERIFY =
    this.BASE_URL_USERS + 'api/user/v2/forgot-password-verify';

  public readonly GET_USER_MENU_RIGHTS =
    this.BASE_URL_USERS + 'api/user/user-rights';

  public readonly GET_USER_ROLES =
    this.BASE_URL_MASTER + 'api/master/v1/roles/departmentId/1';

  public readonly GET_PC = this.BASE_URL_MASTER + 'api/master/v1/pc';

  public readonly GET_AC = this.BASE_URL_MASTER + 'api/master/v1/ac/';

  public readonly GET_SECTOR = this.BASE_URL_MASTER + 'api/master/v1/sector';

  public readonly GET_SECTOR_SO =
    this.BASE_URL_USERS + 'api/so/v1/so/electionId/';

  public readonly GET_PSTATION =
    this.BASE_URL_MASTER + 'api/master/v1/pstation/electionId/'; 

  public readonly GET_DISTRICT =
    this.BASE_URL_MASTER + 'api/master/v1/districts/2';

  public readonly GET_EVENTS = this.BASE_URL_MASTER + 'api/master/v1/events/';

  public readonly GET_RANGES = this.BASE_URL_MASTER + 'api/master/v1/ranges/2';

  public readonly GET_PS =
    this.BASE_URL_MASTER + 'api/master/v1/districts/rangeId/';

  public readonly GET_PS_DETAILS =
    this.BASE_URL_USERS + 'api/user/v1/ps-details/electionId/';

  public readonly GET_MONITORING_DETAILS =
    this.BASE_URL_PDMS + 'api/pdms/v1/interruption-history/electionId/';

  public readonly GET_ELECTION_DETAILS =
    this.BASE_URL_MASTER + 'api/master/v1/elections/1';

  /* public readonly POST_REGISTER_USER = this.BASE_URL +"hpvig-users/api/user/register"; */

  public readonly POST_REGISTER_USER =
    this.BASE_URL_USERS + 'api/user/v1/register';
   
  public readonly POST_RESET_PASSWORD_USER =
    this.BASE_URL_USERS + 'api/user/v1/reset-password';

  public readonly POST_UPDATE_USER_INFO =
    this.BASE_URL_USERS + 'api/user/update-profile';

  public readonly POST_SEARCH_USER =
    this.BASE_URL_USERS + 'api/user/v1/search-user';

  //public readonly POST_PRE_POLL_SUMMARY = this.BASE_URL + "api/pre-poll/v1/pre-poll-summary";


  public readonly USER_DOWNLOAD =
  this.BASE_URL_USERS + 'api/reports/v1/download-users';

  public readonly POST_PRE_POLL_SUMMARY =
    this.BASE_URL_PDMS + 'api/pre-poll/v1/pre-poll-summary';
  public readonly POST_POLL_SUMMARY =
    this.BASE_URL_PDMS + 'api/post-poll/v1/post-poll-summary';
  public readonly POLL_SUMMARY =
    this.BASE_URL_PDMS + 'api/poll-day/v1/poll-day-summary';

  public readonly POST_VOTER_TURN_OUT_SUMMARY =
    this.BASE_URL_PDMS + 'api/pdms/v1/voter-tunrout-summary';

  public readonly POST_VOTER_PROGRESS_SUMMARY =
    this.BASE_URL_PDMS + 'api/poll-day/v1/poll-day-hourly-summary';

  public readonly POST_VOTER_PROGRESS =
    this.BASE_URL_PDMS + 'api/poll-day/v1/poll-day-hourly-details';

  public readonly POST_DASHBOARD =
    this.BASE_URL_PDMS + 'api/dashboard/v1/dashboard';  
    
  public readonly POST_NOREPORTSMS =
    this.BASE_URL_PDMS + 'api/pdms/v1/send-reminder-sms'; 
    
  public readonly POST_PRE_POLL_DETAILED =
    this.BASE_URL_PDMS + 'api/pre-poll/v1/pre-poll-details';
  public readonly POST_POLL_DETAILED =
    this.BASE_URL_PDMS + 'api/post-poll/v1/post-poll-details';
  public readonly POLL_DETAILED =
    this.BASE_URL_PDMS + 'api/poll-day/v1/poll-day-details';

  public readonly POST_PRE_POLL_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/pre-poll-report';
  public readonly POST_POLL_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/post-poll-report';
  public readonly POLL_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/poll-day-report';
  public readonly VOTER_TURNOUT_REPORT_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/voter-turnout-report';
  public readonly VOTER_TURNOUT_SUMMARY_REPORT_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/voter-turnout-summary-report';

  public readonly HOURLY_DETAILS_REPORT_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/poll-day-hourly-details-report';
  public readonly HOURLY_SUMMARY_REPORT_DOWNLOAD =
    this.BASE_URL_PDMS + 'api/report/v1/poll-day-hourly-summary-report';

  public readonly POST_VOTER_TURN_OUT =
    this.BASE_URL_PDMS + 'api/pdms/v1/voter-tunrout-details';

  public readonly POST_MONITORING_SUMMARY_DATA =
    this.BASE_URL_PDMS + 'api/pdms/v1/poll-interruption-summary';
  public readonly POST_MONITORING_DATA =
    this.BASE_URL_PDMS + 'api/pdms/v1/poll-interruption-details';

  public readonly SAVE_EVENT_DATA =
    this.BASE_URL_PDMS + 'api/pdms/v1/poll-events';

  public readonly POST_FEED_PRE_POLL_DATA =
    this.BASE_URL_PDMS + 'api/pre-poll/v1/pre-poll-status/electionId/';
  public readonly POST_FEED_POST_POLL_DATA =
    this.BASE_URL_PDMS + 'api/post-poll/v1/post-poll-status/electionId/';
  public readonly POST_FEED_POLL_DAY_DATA =
    this.BASE_URL_PDMS + 'api/poll-day/v1/poll-day-status/electionId/';

  public readonly GET_SO_DATA =
    this.BASE_URL_USERS + 'api/so/v1/so-mapping-details/electionId/';
  public readonly SAVE_MAP_UNMAP_DATA =
    this.BASE_URL_USERS + 'api/so/v1/so-map-unmap';

  public readonly POST_CHANGE_PASS =
    this.BASE_URL_USERS + 'api/user/v1/change-password';

  public readonly GET_USER_INFO =
    this.BASE_URL_USERS + 'api/user/user-profile/';

  public HEADER_OPTIONS: any = '';

  public HEADER_OPTIONS_FILE_UPLOAD: any = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    if (this.HEADER_OPTIONS == '') {
      this.createHeaderOption(
        this.storageService.get(this.storageService.KEY_TOKEN)
      );
    }
  }

  public getUpdateUserStatusApi(uid: any, status: any) {
    return (
      this.BASE_URL_USERS + 'api/user/update-status/' + uid + '/user/' + status
    );
  }

  public createHeaderOption(token: any) {
    this.HEADER_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + token,
      }),
    };
  }

  public createHeaderOptionFileUpload(token: any) {
    this.HEADER_OPTIONS_FILE_UPLOAD = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        //'Authorization': 'Bearer ' + token,
      }),
    };
  }
}
