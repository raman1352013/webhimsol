
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
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: any;
  pricingForm: any;
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

) {this.productForm = this.fb.group({
  project: ['ASTRO', Validators.required],
  productCode: ['', Validators.required],
  productInstructor: ['', Validators.required],
  productName: ['', Validators.required],
  productType: ['', Validators.required],
  productLevel: ['', Validators.required],
  shortDesc: ['', Validators.required],
  description: ['', Validators.required],
  productStartDate: ['',Validators.required],
productEndDate: ['',],
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
}
