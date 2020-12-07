import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { DataSharedService } from 'src/app/shared/behaviour-subject/data-shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  product_list: any = [];
  product_filter: any;
  p: number = 1;
  
  constructor(
    private router: Router,
    private productService: ProductService,
    private behaviourSub: DataSharedService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.productService
      .productList()
      .pipe()
      .subscribe((products) => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.product_list = products.products;
        }, 2000);
      });
  }

  // ***************** update product via _id ******************
  updateProduct(product) {
    this.behaviourSub.add_product(product);
    this.router.navigate(['/product']);
  }

  // ***************** delete product via _id ******************
  deleteProduct(product) {
    this.productService
      .deleteProduct(product._id)
      .pipe()
      .subscribe((product) => {
        console.log('after delete product=======>', product);
      });
  }
}
