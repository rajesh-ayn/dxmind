import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  private employees: Employee[] = [];

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  employeeData: any = {
    photo: '',
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    gender: '',
    age: '',
    country: '',
    state: '',
    city: '',
    mobile: '',
    address: '',
    checkin: '',
    checkout: '',
  };

  constructor(private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  // ******************  Create new employee  *******************
  addEmployee(empData: any) {
    this.employeeData.photo = empData.photo;
    this.employeeData.first_name = empData.first_name;
    this.employeeData.last_name = empData.last_name;
    this.employeeData.dob = empData.dob;
    this.employeeData.email = empData.email;
    this.employeeData.gender = empData.gender;
    this.employeeData.age = empData.age;
    this.employeeData.country = empData.country;
    this.employeeData.state = empData.state;
    this.employeeData.merital_status = empData.merital_status;
    this.employeeData.city = empData.city;
    this.employeeData.mobile = empData.mobile;
    this.employeeData.address = empData.address;
    this.employeeData.checkin = empData.checkin;
    this.employeeData.checkout = empData.checkout;

    this.http
      .post<{ message: string; employee: Employee }>(
        'http://localhost:3000/api/employees',
        this.employeeData
      )
      .subscribe(
        (responseData:any) => {
          console.log('add employee service ===>', responseData);
          this.toastr.success("Employee added successfully", "Employee!");
          this.router.navigate(['/']);
        },
        (err) => {
          console.log('error in create employee ==>', err);
        }
      );
  }

  // ******************  Getting all employees list  *************
  employeeList() {
    return this.http.get<{ message: string; employees: any }>(
      'http://localhost:3000/api/employees'
    );
  }

  // ******************  Delete Single employee  *************
  deleteEmployeByID(employee: any) {
    return this.http.delete(
      'http://localhost:3000/api/employees/' + employee._id
    );
  }

  // *************** update employee via _id ***************
  updateEmployee(employee) {
    let employeeData: any = {
      _id: '',
      photo: "",
      status: "",
      first_name: "",
      last_name: "",
      email: "",
      dob: "",
      gender: "",
      age: "",
      merital_status: "",
      country: "",
      state: "",
      city: "",
      mobile: "",
      address: "",
      checkin: "",
      checkout: "",
    };

    employeeData = {
      _id: employee._id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      dob: employee.dob,
      age: employee.age,
      merital_status: employee.merital_status,
      photo: employee.photo,
      status: employee.status,
      country: employee.country,
      state: employee.state,
      city: employee.city,
      mobile: employee.mobile,
      address: employee.address,
      checkin: employee.checkin,
      checkout: employee.checkout,
    };

    this.http
      .put('http://localhost:3000/api/employees/' + employee._id, employeeData)
      .subscribe((response:any) => {
        if(response.status === true) {
          this.toastr.success(response.message, "Employee Update!")
          this.router.navigate(['/employee-list']);
        } 
       
      });
  }

}
