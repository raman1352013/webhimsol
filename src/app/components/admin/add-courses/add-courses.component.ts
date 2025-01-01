import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiUrlService } from '../../../services/api-url.service';
import { CommonService } from '../../../services/common.service';
import { RouteServiceService } from '../../../services/route-service.service';
import { UtilService } from '../../../services/util.service';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';
import { ManageCourseService } from '../../../services/manage-course.service';


@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent  implements OnInit{

  coursesData: any;
  errorMsg!: string;

  
  LessonsList: any;
  currentContent: any;
  courseList: any;
  courseDropDownList: any;

 
  token!: string ;
  courseType: any;
  courseLevel: any;
  courseForm!: FormGroup;
  moduleForm!: FormGroup;
  lessonForm!: FormGroup;
  contentForm!:FormGroup;
  sessionForm!: FormGroup;
instructors: any;
  instructorList: any;
  total!: number;
  course: any;
  // courseId: any;
  courseId: string | null = null;
  isEditingContent: boolean =false;
  //  courseId='z0_6CvgUy_OXx1LadHJJX';
  actualPrice: number = 0;
  sellingPrice: number = 0;
  gst: number = 0;
  enrollmentDuration: number | null = null;
  // isFree: boolean = false;
  constructor(
 
    private apiUrl : ApiUrlService,
    
    private router: Router,
      private commonService: CommonService,
      private utils:UtilService,
      private spinner: NgxSpinnerService,
      private routeService:RouteServiceService,
      private fb: FormBuilder,
      private manageCourse:ManageCourseService,
      private toastr: ToastrService,

) {this.courseForm = this.fb.group({
  project: ['ASTRO', Validators.required],
  courseCode: ['', Validators.required],
  courseInstructor: ['', Validators.required],
  courseName: ['', Validators.required],
  courseType: ['', Validators.required],
  courseLevel: ['', Validators.required],
  shortDesc: ['', Validators.required],
  description: ['', Validators.required],
  courseStartDate: ['',Validators.required],
  courseEndDate: ['',],
  duration: ['', ],
  priority: [1, Validators.required],
  extraParams: this.fb.group({
    certificateAvailable: [true],
    estimatedDuration: ['30 hours', Validators.required]
  })
});
this.pricingForm = this.fb.group({
  pricingOption: ['one-time', Validators.required],
  actualPrice: [{ value: null, disabled: false }, [Validators.required, Validators.min(0)]],
  sellingPrice: [{ value: null, disabled: false }, [Validators.required, Validators.min(0)]],
  // gst: [{ value: null, disabled: false }],
  enrollmentDuration: [null, [Validators.required, Validators.min(1)]],
});
// this.pricingForm.get('sellingPrice')?.valueChanges.subscribe(value => {
//   this.calculateGst(value);
// });
}




  content: string = '';
  savedContent: string = '';
   newModuleName: string = '';
   newLessonName1: string = '';
   newLessonName: string = '';
   moduleDescription: string = '';
   isAddModuleVisible: boolean = false;
   
   isAddLessonVisible: boolean = false;
   isAddLessonContentVisible: boolean = false;
   selectedFile: File | null = null;
  

fileType: any;
lessonTitle: string = '';
  lessonType: string = 'Video';
  lessons: Array<{ title: string; type: string }> = [];
   
  editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image']
    ]
  };
  curriculumModules: any[] = [];

selectedModule: any = null; // For editing module details
selectedModuleId: number | null = null;
selectedLessonId: number | null = null;
selectedContentId: number | null = null;

  chosenModule: any;
  chosenLesson:any;
contentTitle: any;
contentType: string = ''; // Default value


  sessionTitle: string = ''; // Title for Online Session
  startDate: string = ''; // Start Date
  startTime: string = ''; // Start Time
  duration: string = ''; // End Date
  endTime: string = ''; // End Time
  sessionDetails: string = ''; // Details about the session
  isEditMode: boolean = false;
  isEditingLesson: boolean = false;
  currentLesson: any = null; // Stores the lesson being edited (if any)

lessonDescription: string = '';
selectedCourseCode: any = null; 
minDate: string = '';
pricingForm!: FormGroup;



goToPage(pagename:any){
    
  this.routeService.goToPage(pagename);
 
 }

 ngOnInit(): void {
    
  // this.tokenCheckService.getToken().subscribe(
  //   token => {
      
  //     this.token = token;

      
     
  //   },
  //   (    error: any) => {
  //     console.error('Error fetching token:', error);
  //   }
  // );
  //  this.getCourseList();
  // this.getCourseType();
  // this.getCourseLevel();
  // this.searchInstructor();
  // this.course = this.manageCourse.getCourse();
  // console.log(this.course);
  // if (this.course) {
  //   this.populateForm(this.course);
  // }
// this.getModule(this.courseId);

this.initializeForm();
  

  const today = new Date();
  this.minDate = today.toISOString().split('T')[0];

 
  
  
 }
 get isFree(): boolean {
  return this.pricingForm?.get('pricingOption')?.value === 'free';
}

 initializeForm() {
  this.moduleForm = this.fb.group({
    newModuleName: [
      this.newModuleName,
      [Validators.required, Validators.minLength(1),this.noSpecialCharactersValidator(/^[a-zA-Z0-9\s\-\/\.]+$/)]
    ],
    moduleDescription: [this.moduleDescription, Validators.required]
  });
  this.lessonForm = this.fb.group({
    newLessonName1: [
      this.newLessonName1,
      [Validators.required, Validators.minLength(1),this.noSpecialCharactersValidator(/^[a-zA-Z0-9\s\-\/\.]+$/)]
    ],
    lessonDescription: [this.lessonDescription, Validators.required]
  });
  this.contentForm = this.fb.group({
    contentType: ['',Validators.required ],
    contentTitle: ['', ],
    fileType: ['', ],
    uploadFile: [null],
    sessionTitle: ['', Validators.required],
    startDate: ['', Validators.required],
    duration: ['', Validators.required],
    sessionDetails: ['',Validators.required],
  });
  
}
noSpecialCharactersValidator(pattern: RegExp): Validators {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = pattern.test(control.value || '');
    return isValid ? null : { invalidCharacters: true };
  };
}


 populateForm(course: any): void {
  // Extract the date in 'YYYY-MM-DD' format
  const courseStartDate = course.startDate ? course.startDate.split('T')[0] : null;
  const courseEndDate = course.endDate ? course.endDate.split('T')[0] : null;

  this.courseId=course.id,
  console.log(this.courseId);
  console.log('this si course o be patched',this.course)
  this.courseForm.patchValue({
    
    courseCode: course.courseCode,
    courseName: course.courseName,
    courseInstructor: course.courseInstructor?.userId,
    courseType: course.courseType,
    courseLevel: course.courseLevel,
    description: course.description,
    shortDesc: course.shortDesc,
    courseStartDate: courseStartDate,
    courseEndDate: courseEndDate,
  });
 if (course.price){
  this.pricingForm.patchValue({
    actualPrice:course?.price?.mrp,
    sellingPrice:course?.price?.sellingPrice,
    enrollmentDuration:course?.extraParams?.enrollmentDuration
    

  })
 }
}

 getCourseType(){
  this.spinner.show();
  this.manageCourse.getCourseCategory('COURSE_TYPE',this.token).subscribe(
(response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          this.courseType=response.response;
          console.log(this.courseType)
        } else {
         
        }
      }
      this.spinner.hide();
    },
    (error: any) => {
      this.utils.showError('An error occurred while fetching data.');
      this.spinner.hide();
    }
  );
 }
 getCourseLevel(){
  this.spinner.show();
  this.manageCourse.getCourseCategory('COURSE_LEVEL',this.token).subscribe(
(response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          this.courseLevel=response.response;
          console.log(this.courseType)
        } else {
         
        }
      }
      this.spinner.hide();
    },
    (error: any) => {
      this.utils.showError('An error occurred while fetching data.');
      this.spinner.hide();
    }
  );
 }




 onCourseChange(courseId: any): void {
  this.pricingForm.reset();
  
   const selectedCourse = this.courseDropDownList.find((course: { id: any }) => course.id == courseId);
   console.log('selected couserse is',selectedCourse)
   if (selectedCourse) {
    this.manageCourse.setCourse(selectedCourse);
    this.course = this.manageCourse.getCourse();  
    console.log(this.course);
    if (this.course) {
      this.populateForm(this.course);
      this.activateTab('about-tab');
      this.curriculumModules=[];
    }
   }
 }
 activateTab(tabId: string): void {
  // Use Bootstrap's tab API to show the specified tab
  const tabElement = document.getElementById(tabId);
  if (tabElement) {
    const tabTrigger = new bootstrap.Tab(tabElement);
    tabTrigger.show();
  }
}
 
changeStatus(module:any){
  
  this.selectedModuleId = module.id; 
  this.moduleForm.patchValue({
    newModuleName: module.name,
    moduleDescription: module.description || '',
    status:module.status
  });
  const currentStatus = module.status;
  const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  
  module.status = newStatus;
    this.spinner.show();
    let payload = {
      id : this.selectedModuleId,
      courseId:this.courseId,
      name: this.moduleForm.value.newModuleName,
      description: this.moduleForm.value.moduleDescription,
      status:newStatus,
      priority: 1,
     
    } 
 

    console.log(payload);

    this.manageCourse.createModule(payload, this.token).subscribe((response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          this.getModule(this.courseId);
          this.resetItems();
          // this.moduleId=response.response.id;
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
          this.spinner.hide();
        }
        this.spinner.hide();
      }else{
        this.spinner.hide();
      }
    });
  
  this.spinner.hide();

}
changeLessonStatus(module:any,lesson:any){
  this.selectedModuleId = module.id; 
  this.selectedLessonId = lesson.id; 
  // this.lessonForm.patchValue({
  //   newlessonName: lesson.name,
  //   lessonDescription: lesson.description || '',
  //   status:lesson.status
  // });
  const currentStatus = lesson.status;
  const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  
  lesson.status = newStatus;
    this.spinner.show();
    let payload = {
      id : this.selectedLessonId,
      moduleId:this.selectedModuleId,
      name: this.lessonForm.value.newlessonName,
      description: this.lessonForm.value.lessonDescription,
      status:newStatus,
      priority: 1,
     
    } 
 

    console.log(payload);

    this.manageCourse.createLesson(payload, this.token).subscribe((response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          this.getLesson(module);
          this.resetItems();
          // this.moduleId=response.response.id;
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
          this.spinner.hide();
        }
        this.spinner.hide();
      }else{
        this.spinner.hide();
      }
    });
  
  this.spinner.hide();

}
changeContentStatus(lesson:any,content:any){
 
  this.selectedLessonId = lesson.id; 
  this.selectedContentId = content.id; 

  // this.lessonForm.patchValue({
  //   newlessonName: lesson.name,
  //   lessonDescription: lesson.description || '',
  //   status:lesson.status
  // });
  const currentStatus = content.status;
  const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  
  content.status = newStatus;
    this.spinner.show();
    let payload = {
      id : this.selectedContentId,
      lessonId:this.selectedLessonId,
      name: this.contentForm.value.sessionTitle,
      description: this.contentForm.value.sessionDetails,
      status:newStatus,
      priority: 1,
    } 
 console.log(payload);

    this.manageCourse.createContent(payload, this.token).subscribe((response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          this.getSession(this.selectedLessonId)
          this.resetItems();
          // this.moduleId=response.response.id;
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
          this.spinner.hide();
        }
        this.spinner.hide();
      }else{
        this.spinner.hide();
      }
    });
  
  this.spinner.hide();

}

 saveCourse(): void {
  if (this.courseForm.invalid) {
    this.courseForm.markAllAsTouched();
    return;
  }

  if (this.courseForm.valid) {
    this.spinner.show();
    let payload = {
      project: "ASTRO",
      
      courseCode: this.courseForm.value.courseCode,
      courseInstructor: {
        userId: this.courseForm.value.courseInstructor
      },
      courseName: this.courseForm.value.courseName,
      courseType: this.courseForm.value.courseType,
      courseLevel: this.courseForm.value.courseLevel,
      shortDesc: this.courseForm.value.shortDesc,
      description: this.courseForm.value.description,
      startDate: this.courseForm.value.courseStartDate,
      endDate: this.courseForm.value.courseEndDate,
      duration: this.courseForm.value.duration,
      priority: 1,
      extraParams: {
        certificateAvailable: this.courseForm.value.extraParams.certificateAvailable,
        estimatedDuration: this.courseForm.value.extraParams.estimatedDuration
      }
    } as any;;
    if (this.courseId) {
      payload.courseId = this.courseId;
    }

    console.log(payload);

    console.log(payload);

    this.manageCourse.addCourse(payload, this.token).subscribe((response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          this.courseId=response.response.id;
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
        }
        this.spinner.hide();
      }
    });
  }
}

// searchInstructor() {
//   this.spinner.show();
//    const payload = {
//      pageNumber:0,
//    pageSize:50,
//    searchBy: {
//      status: "ACTIVE",
//      role: "INSTRUCTOR"
//    }
//    };
   
 
//    this.userManagementService.searchUser(payload,this.token).subscribe((response: any) => {
//      if (response.hasOwnProperty('statusCode')) {  if (response.statusCode === 'ADV-000') {
//        this.instructorList = response.response.content;
//        console.log(this.instructorList)
       
       
//      } else if (response.statusCode == 'ADV-404') {
//        this.utils.showWarning('Warning', response.message);
//        this.instructorList = [];
//        this.total = 0;
//      } else {
//        this.instructorList = [];
//        this.total = 0;
       
//      }this.spinner.hide();
//  }}
 
//  );
 
//  }
 addNewModule(){
  if (this.moduleForm.invalid) {
    this.moduleForm.markAllAsTouched();
    return;
  }

  if (this.moduleForm.valid) {
    this.spinner.show();
    let payload = {
      courseId:this.courseId,
      name: this.moduleForm.value.newModuleName,
      description: this.moduleForm.value.moduleDescription,
      status:"ACTIVE",
      priority: 1,
     
    } as any;;
    if (this.selectedModuleId && this.isEditMode) {
      payload.id = this.selectedModuleId;
    }

    console.log(payload);

    console.log(payload);

    this.manageCourse.createModule(payload, this.token).subscribe((response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          this.getModule(this.courseId);
          this.resetItems();
          // this.moduleId=response.response.id;
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
          this.spinner.hide();
        }
        this.spinner.hide();
      }else{
        this.spinner.hide();
      }
    });
  }

}
addNewLesson(module:any){
  if (this.lessonForm.invalid) {
    this.lessonForm.markAllAsTouched();
    return;
  }

  if (this.lessonForm.valid) {
    console.log(this.lessonForm)
    this.spinner.show();
    let payload = {
     
      
      moduleId:module.id,
      name: this.lessonForm.value.newLessonName1,
      description: this.lessonForm.value.lessonDescription,
      status:"ACTIVE",
      priority: 1,
    } as any;;
    if (this.currentLesson) {
      payload.id = this.currentLesson.id;
    }

    console.log(payload);

    console.log(payload);

    this.manageCourse.createLesson(payload, this.token).subscribe((response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          // this.lessonId=response.response.id;
          this.lessonForm.reset();
          this.getLesson(module);
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
        }
        this.spinner.hide();
      }
    });
    
  }
}

addNewContent(module: any,lesson:any): void {
  console.log(this.contentForm)
  if (this.contentForm.invalid) {
    this.contentForm.markAllAsTouched();
    return;
  }

  this.spinner.show();

  const payload = {
    lessonId: lesson.id,
    type:this.contentForm.value.contentType,
      title: this.contentForm.value.sessionTitle,
      description: this.contentForm.value.sessionDetails,
      startTime:this.contentForm.value.startDate,
      duration:this.contentForm.value.duration,
      priority: 1,
      status: "ACTIVE"
  } as any;
  if (this.currentContent) {
    payload.id = this.currentContent.id;
  }

  this.manageCourse.createContent(payload, this.token).subscribe(
    (response: any) => {
      if (response.statusCode === 'ADV-000') {
        this.utils.showSuccess('', response.message);
        this.contentForm.reset();
        this.getSession(lesson.id)
      } else {
        this.utils.showError(response.message);
      }
      this.spinner.hide();
    },
    (error: any) => {
      this.utils.showError('An error occurred while saving content.');
      this.spinner.hide();
    }
  );
}

getModule(courseId:any){
  this.spinner.show();
  this.manageCourse.getSearchModule(courseId,this.token).subscribe(
(response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          this.curriculumModules = response.response.map((module: any) => ({
            ...module,
            lessons: [], // Initialize lessons array
            isStatusDropdownOpen: false, // Manage dropdown state
          }));
          console.log(this.curriculumModules)
        } else {
         
        }
      }
      this.spinner.hide();
    },
    (error: any) => {
      this.utils.showError('An error occurred while fetching data.');
      this.spinner.hide();
    }
  ); 
}
getLesson(module:any){
  this.spinner.show();
  this.manageCourse.getSearchLesson(module.id,this.token).subscribe(
(response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          module.lessons = response.response.map((lesson: any) => ({
            ...lesson,
            isVisible: false, // Manage lesson visibility
          }));
          console.log(module.lessons);
        } else {
         
        }
      }
      this.spinner.hide();
    },
    (error: any) => {
      this.utils.showError('An error occurred while fetching data.');
      this.spinner.hide();
    }
  ); 
}
getSession(lessonId: any): void {
  this.spinner.show();
  this.manageCourse.getSearchSession(lessonId, this.token).subscribe(
    (response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          // Find the lesson by lessonId and update its content
          const lesson = this.findLessonById(lessonId);
          if (lesson) {
            lesson.contents = response.response;
          }
          console.log(lesson?.contents);
        }
      }
      this.spinner.hide();
    },
    (error: any) => {
      this.utils.showError('An error occurred while fetching data.');
      this.spinner.hide();
    }
  );
}

getCourseList(){
  const payload = {
   
    pageNumber: 0, 
    pageSize:30, 
    searchBy: {project:"ASTRO"}  
  };
  this.manageCourse.searchCourse(payload, this.token).subscribe(
    (response: any) => {
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          this.courseDropDownList=response.response.content;
          console.log(this.courseDropDownList);
          
        } else {
         this.errorMsg="no data found";
        }
      }
      this.spinner.hide();
      
    },
    (error: any) => {
      this.utils.showError('An error occurred while fetching data.');
      this.spinner.hide();
    }
  );
}
handlePricingChange(option: string) {
  if (option === 'free') {
    // this.isFree = true;
    this.pricingForm.patchValue({
      actualPrice: 0,
      sellingPrice: 0,
      gst: 0,
    });
    // this.pricingForm.get('actualPrice')?.disable();
    // this.pricingForm.get('sellingPrice')?.disable();
    // this.pricingForm.get('gst')?.disable();
  } else {
    // this.pricingForm.reset();
    // this.isFree = false;
    // this.pricingForm.get('actualPrice')?.enable();
    // this.pricingForm.get('sellingPrice')?.enable();
    // this.pricingForm.get('gst')?.enable();
  }
}

addPrice() {
  console.log('i m here ')
  console.log(this.pricingForm)
  if (this.pricingForm.invalid) {
    this.pricingForm.markAllAsTouched();
    return;
  }
  if (this.pricingForm.valid) {
    this.spinner.show();
    const pricingData = {
      courseId: this.courseId, 
      price: {
        mrp: this.pricingForm.value.actualPrice,
        sellingPrice: this.pricingForm.value.sellingPrice,
        igstRate: 18,
      },
      extraParams: {
        enrollmentDuration: this.pricingForm.value.enrollmentDuration,
      },
    };

    console.log('Pricing data to be submitted:', pricingData);
    this.manageCourse.addCourse(pricingData, this.token).subscribe((response: any) => {
      this.spinner.hide();
      if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response);
          this.utils.showSuccess('', response.message);
          
          this.resetItems();
          // this.moduleId=response.response.id;
         
        } else if (response.statusCode === 'ADV-404') {
          this.utils.showError( response.message);
         
        } else {
          this.utils.showError( response.message);
          this.spinner.hide();
        }
        this.spinner.hide();
      }else{
        this.spinner.hide();
      }
    });
  }

}
addPriceClicked() {

  console.log('addprice clicked');
}
priceCancelClicked() {
  this.activateTab('about-tab');
  this.cancelClicked();
  }



// calculateGst(sellingPrice: number): void {
//   if (sellingPrice) {
//     const gst = (sellingPrice * 18) / 100; // 18% GST
//     this.pricingForm.get('gst')?.setValue(gst, { emitEvent: false }); // Set the GST value without triggering valueChanges
//   }
// } 
// calculateGst(sellingPrice: number): void {
//   if (sellingPrice && sellingPrice > 0) {
//     const gst = (sellingPrice * 18) / 100; // 18% GST
//     this.pricingForm.get('gst')?.setValue(gst, { emitEvent: false }); // Set the GST value without triggering valueChanges
//   } else {
//     this.pricingForm.get('gst')?.setValue(0, { emitEvent: false }); // Set GST to 0 when selling price is 0 or falsy
//   }
// }

cancelClicked() {
  this.pricingForm.reset();
  this.initializeForm(); // Reinitialize to default state
  console.log('Cancel clicked');
}



findLessonById(lessonId: any): any {
  for (const module of this.curriculumModules) {
    const lesson = module.lessons.find((l: any) => l.id === lessonId);
    if (lesson) {
      return lesson;
    }
  }
  return null;
}



addModule() {
  const newModule = {
    id: this.curriculumModules.length + 1,
    name: this.newModuleName || `Module ${this.curriculumModules.length + 1}`,
    status: 'Draft',
    lessons: []
  };
  this.curriculumModules.push(newModule);
  this.newModuleName = '';
}

addLesson(moduleId: number) {
  if (this.newLessonName1.trim()) {
  const module = this.curriculumModules.find((m: { id: number; }) => m.id === moduleId);
  if (module) {
    const newLesson = {
      id: module.lessons.length + 1,
      name:this.newLessonName1 
     
    };
    module.lessons.push(newLesson);
  }
  else{
    alert('lesson name is required.');
  }
    this.newLessonName = '';
  }
}

editModule1(module: any): void {
  console.log('edit', module);
  this.showAddModule();
  
  // Disable edit mode for all modules
  this.curriculumModules.forEach((m: any) => (m.isEditing = false));

  // Find the selected module
  this.selectedModule = this.curriculumModules.find((m: { id: number }) => m.id === module.id);
  
  if (this.selectedModule) {
    this.selectedModule.isEditing = true; // Enable edit mode for the selected module
    
    this.newModuleName=this.selectedModule.name;
    this.moduleDescription = this.selectedModule.name; 
  }
}
// Edit Module Function
editModule(module: any): void {
  console.log(module);
  this.showAddModule();
  this.isEditMode = true; // Enable edit mode

  this.selectedModuleId = module.id; 
  this.moduleForm.patchValue({
    newModuleName: module.name,
    moduleDescription: module.description || '',
    status:module.status
  });
  // this.newModuleName = module.name; 
  // this.moduleDescription = module.description || '';

}
editLesson(lesson: any): void {
  
}



saveModule() {
  if (this.selectedModule) {
    console.log('Module saved:', this.selectedModule);
    this.selectedModule = null;
    this.moduleDescription = '';
  }
}

cancelEdit() {
  this.selectedModule = null;
  this.moduleDescription = '';
}
 // Add a new module
 addNewModule1() {
  if (this.newModuleName.trim()) {
    const newModule = {
      id: this.curriculumModules.length + 1,
      name: this.newModuleName.trim(),
      status: 'Draft',
      lessons: []
    };

    // Add the new module to the curriculumModules array
    this.curriculumModules.push(newModule);

    // Clear form fields
    this.newModuleName = '';
    this.moduleDescription = '';

    console.log('New module added:', newModule);
  } else {
    alert('Module name is required.');
  }
}

// Cancel adding a module (reset form)
cancelAddModule() {
  this.newModuleName = '';
  this.moduleDescription = '';
}

resetData(){
  this.newModuleName = '';
  this.moduleDescription = '';
  this.isAddModuleVisible = false;
  this.isAddLessonVisible = false;
  this.isAddLessonContentVisible = false;
  this.isEditMode = false;
  this.selectedModuleId = null;
  this.isEditingLesson = false;
  this.chosenModule = null;
  this.currentLesson = null;
  this.newLessonName = '';
  this.lessonDescription = '';
  this.moduleForm?.reset();
  this.lessonForm?.reset();
 
  this.contentForm?.reset();
}

showAddModule() {
  this.resetData();
  this.resetItems();
  this.isAddModuleVisible = true;
  this.isAddLessonVisible = false;
  this.isAddLessonContentVisible = false;
  this.isEditMode = false;
}
showAddLesson(module:any){
  console.log(module)
  this.chosenModule=module;
  this.isAddModuleVisible = false;
  this.isAddLessonContentVisible = false;
  this.isAddLessonVisible = true;
  
}
showAddLessonContent(module:any,lesson:any){
  this.contentForm?.reset();
  this.currentContent = null;
  console.log(lesson)
  this.chosenModule=module;
  this.chosenLesson=lesson;
  this.isAddModuleVisible = false;
  this.isAddLessonVisible = false;
  this.isAddLessonContentVisible = true;
  
}
showEditLessonContent(module: any, lesson: any, content: any = null): void {
  console.log('Module:', module);
  console.log('Lesson:', lesson);
  console.log('Content:', content);

  this.chosenModule = module;
  this.chosenLesson = lesson;
  this.isAddModuleVisible = false;
  this.isAddLessonVisible = false;
  this.isAddLessonContentVisible = true;

  if (content) {
    // Edit existing content
    this.isEditingContent = true;
    this.currentContent = content;
    const conentStartDate = content.startTime ? content.startTime.split('T')[0] : null;

    this.contentForm.patchValue({
      sessionTitle: content.title,
      sessionDetails: content.description,
      sessionType: content.type ,
      startDate:conentStartDate,
      duration:content.duration
    });
  } else {
    // Add new content
    this.isEditingContent = false;
    this.currentContent = null;
    this.contentForm.reset({
      sessionTitle: '',
      sessionDescription: '',
      sessionType: 'video'
    });
  }
}

addLessonContent1(): void {
  
  if (this.lessonTitle.trim()) {
    this.lessons.push({
      title: this.lessonTitle,
      type: this.lessonType,
    });
    this.lessonTitle = ''; // Clear input field after adding the lesson
  } else {
    alert('Please enter a valid lesson Content title');
  }
}
addLessonContent(module: any, lesson: any) {
  if (this.contentTitle.trim()) {
    if (!lesson.contents) {
      lesson.contents = [];
    }
    const newContent = {
      title: this.contentTitle.trim(),
      type: this.contentType,
    };
    lesson.contents.push(newContent);
    this.contentTitle = ''; // Clear the input field
  } else {
    alert('Lesson content title is required.');
  }
}
saveLessonContent() {
  throw new Error('Method not implemented.');
  }

  
  uploadFile() {
  throw new Error('Method not implemented.');
  }


onFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

triggerFileInput(): void {
  const fileInput = document.getElementById('uploadFile') as HTMLElement;
  fileInput.click();
}
toggleLessonContent(lesson: any): void {
  lesson.isVisible = !lesson.isVisible;
 
  if (lesson.isVisible) {
    this.getSession(lesson.id);
  }
}

// Add New Content to Lesson
showAddLessonContent3(module: any): void {
  const newContentNumber = module.lessons.length + 1;
  module.lessons.push({
    title: `Content ${newContentNumber}`,
    type: 'Video', // Default type, can be dynamic
  });
}

cancleClicked(){
  this.isAddModuleVisible = false;
  this.isAddLessonVisible = false;
  this.isAddLessonContentVisible = false;
  this.isEditMode = false;
  this.selectedModuleId = null;
  this.isEditingLesson = false;
  this.chosenModule = null;
  this.currentLesson = null;
  this.newLessonName = '';
  this.lessonDescription = '';
}

resetItems(){

  this.isAddModuleVisible = false;
  this.isAddLessonVisible = false;
  this.isAddLessonContentVisible = false;
  this.isEditMode = false;
  this.selectedModuleId = null;
  this.isEditingLesson = false;
  this.chosenModule = null;
  this.currentLesson = null;
  this.newLessonName = '';
  this.lessonDescription = '';
  this.moduleDescription = '';
  this.newModuleName = '';


}
toggleStatusDropdown(module: any): void {
  console.log(module)
  module.isStatusDropdownOpen = !module.isStatusDropdownOpen;

  console.log(module)
  this.chosenModule=module;
  
  if (module.isStatusDropdownOpen) {
    this.getLesson(module);
    
  }
}
// Update Existing Module
updateModuleold(): void {
  if (this.selectedModuleId !== null) {
    const module = this.curriculumModules.find((m: any) => m.id === this.selectedModuleId);
    if (module) {
      module.name = this.newModuleName;
      module.description = this.moduleDescription;
      console.log('Module updated:', module);
    }
  }
  this.isAddModuleVisible = false;
  this.selectedModuleId = null;
  this.isEditMode = false;
}



addNewModuleold(): void {
  
  const newModule = {
    id: this.curriculumModules.length + 1, 
    name: this.newModuleName,
    description: this.moduleDescription,
    status: 'Draft',
    lessons: [] 
  };
  this.curriculumModules.push(newModule);
  
  this.newModuleName = '';
  this.moduleDescription = '';
  console.log('New module added:', newModule);
}

// addEditLeson(module: any, lesson: any = null): void {
//   this.isAddLessonVisible = true;
//   this.chosenModule = module;
//   this.isEditingLesson = !!lesson; // If lesson is provided, enable edit mode
//   if (lesson) {
//     // Populate form fields for editing
//     this.currentLesson = lesson;
//     this.newLessonName = lesson.name;
//     this.lessonDescription = lesson.description || '';
//   } else {
//     // Reset form fields for adding a new lesson
//     this.currentLesson = null;
//     this.newLessonName = '';
//     this.lessonDescription = '';
//   }
// }

// Save or Update Lesson
// saveLesson(): void {
//   if (!this.newLessonName.trim()) {
//     alert('Lesson name is required!');
//     return;
//   }

//   if (this.isEditingLesson && this.currentLesson) {
//     // Update existing lesson
//     this.currentLesson.name = this.newLessonName;
//     this.currentLesson.description = this.lessonDescription;
//     console.log('Lesson updated:', this.currentLesson);
    
//   } else {
//     // Add new lesson
//     const newLesson = {
//       id: this.chosenModule.lessons.length + 1, // Generate a new ID
//       name: this.newLessonName,
//       description: this.lessonDescription,
//       contents: [], // Initialize empty contents
//       isVisible: false, // Default to collapsed
//     };
//     this.chosenModule.lessons.push(newLesson);
//     console.log('New lesson added:', newLesson);
//   }

//   this.resetData(); // Reset form and hide it
// }
// Add or Update Lesson
// saveOrUpdateLessonold(): void {
//   if (!this.newLessonName.trim()) {
//     alert('Lesson name is required!');
//     return;
//   }

//   if (this.isEditingLesson && this.currentLesson) {
//     // Update existing lesson
//     this.currentLesson.name = this.newLessonName;
//     this.currentLesson.description = this.lessonDescription;
//     console.log('Lesson updated:', this.currentLesson);
//   } else {
//     // Add new lesson
//     const newLesson = {
//       id: this.chosenModule.lessons.length + 1, // Generate a new ID
//       name: this.newLessonName,
//       description: this.lessonDescription,
//       contents: [], // Initialize empty contents
//       isVisible: false, // Default to collapsed
//     };
//     this.chosenModule.lessons.push(newLesson);
//     console.log('New lesson added:', newLesson);
//   }

//   // Reset and hide the lesson form
//   this.resetLessonForm();
// }

// Reset Lesson Form
resetLessonForm(): void {
  this.newLessonName = '';
  this.lessonDescription = '';
  this.isAddLessonVisible = false;
  this.isEditingLesson = false;
  this.currentLesson = null;
}

// Show Add/Edit Lesson Form
showLessonForm(module: any, lesson: any = null): void {
  this.resetItems();

  this.isAddLessonVisible = true;
  this.isAddModuleVisible=false;
  this.chosenModule = module;
  console.log(this.chosenModule)
  console.log(lesson)

  if (lesson) {
    // Edit existing lesson
    this.isEditingLesson = true;
    this.currentLesson = lesson;
    console.log(lesson)

    this.lessonForm.patchValue({
      newLessonName1: lesson.name,
      lessonDescription: lesson.description || ''
    });
  } else {
    // Add new lesson
    this.isEditingLesson = false;
    this.currentLesson = null;
    this.newLessonName1 = '';
    this.lessonDescription = '';
  }
}



}
