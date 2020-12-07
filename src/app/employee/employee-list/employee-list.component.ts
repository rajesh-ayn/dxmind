import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { DataSharedService } from 'src/app/shared/behaviour-subject/data-shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employee_list: any = [];
  employee_filter;

  p: number = 1;
  
  constructor(private empService: EmployeeService,
    private spinner: NgxSpinnerService,
    private mScrollbarService: MalihuScrollbarService,
    private behaviourSub: DataSharedService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() { 

    this.mScrollbarService.initScrollbar('.employee-list-container', {
      axis: 'x',
      theme: 'dark-thin',
      autoHideScrollbar: true,
      scrollInertia: 100
    });


    this.spinner.show();
    this.empService.employeeList().subscribe((res:any)=> {
       console.log('employee_list=', res);
       setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.employee_list = res.employee_list;
      }, 2000);
      
    })
  }

  // ******************* Delete single employee using ID ******************
  deleteEmployee(employee:any) {
    this.empService.deleteEmployeByID(employee).subscribe((emp:any)=>{
      if(emp.status === true) {
        this.toastr.success(emp.message, "Employee Update!") 
      }
      this.ngOnInit();
    })
  }

  updateEmployee(employee:any) {
    console.log('employee====>',employee);
    
    // ***************** update product via _id ****************** 
    this.behaviourSub.add_employee(employee);
    this.router.navigate(['/employee']); 
  }


}
