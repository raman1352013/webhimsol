import { Injectable } from '@angular/core';
import { ApiUrlService } from './api-url.service';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageCourseService {
  private courseData: any;

 

  constructor(private apiUrl : ApiUrlService, 
    private http : HttpClient,
    private baseService : BaseService,private router: Router,){}


    setCourse(course: any): void {
      console.log('i wil set ',course)
      this.courseData = course;
    }
  
    getCourse(): any {
      console.log('i will return ', this.courseData)
      return this.courseData;
    }
 

  searchCourse(payload : any,token:any){
    return this.baseService.postCall(this.apiUrl.POST_SEARCH_USER, payload, token);
  }
  getInstructor(token:any){
    return this.baseService.getCallWithToken2(this.apiUrl.POST_SEARCH_USER, token);
  }
  getCourseCategory(category:any,token:any){
    return this.baseService.getCallWithToken2(this.apiUrl.POST_SEARCH_USER+category, token);
  }
  addCourse(payload : any,token:any){
    return this.baseService.postCall(this.apiUrl.POST_SEARCH_USER, payload, token);
  }

  createModule(payload : any,token:any){
    return this.baseService.postCall(this.apiUrl.POST_SEARCH_USER, payload, token);
  }
  createLesson(payload : any,token:any){
    return this.baseService.postCall(this.apiUrl.POST_SEARCH_USER, payload, token);
  }
  createContent(payload : any,token:any){
    return this.baseService.postCall(this.apiUrl.POST_SEARCH_USER, payload, token);
  }
 

  getSearchModule(courseId:any,token:any){
    return this.baseService.getCallWithToken2(this.apiUrl.POST_SEARCH_USER+courseId, token);
  }
  getSearchLesson(moduleId:any,token:any){
    return this.baseService.getCallWithToken2(this.apiUrl.POST_SEARCH_USER+moduleId, token);
  }
  getSearchSession(lessonId:any,token:any){
    return this.baseService.getCallWithToken2(this.apiUrl.POST_SEARCH_USER+lessonId, token);
  }


  getListConsultations(token:any){
    return this.baseService.getCallWithToken2(this.apiUrl.POST_SEARCH_USER, token);
  }
}