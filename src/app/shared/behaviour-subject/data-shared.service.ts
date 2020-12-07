import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  // For Product -----   
  product_source = new BehaviorSubject("single-product");
  updated_product = this.product_source.asObservable();

   // For Employee -----  
  employee_source = new BehaviorSubject("single-employee");
  updated_employee = this.product_source.asObservable()

  constructor() { }

  // update product using behaviour subject
  add_product(product) {
    this.product_source.next(product);
  }

  // update product using behaviour subject
  add_employee(employee) {
    this.employee_source.next(employee);
  }
  
}
