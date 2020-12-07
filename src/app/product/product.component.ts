import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from '../shared/product.service';
import { DataSharedService } from '../shared/behaviour-subject/data-shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  productForm: FormGroup;
  submitted: boolean = false;

  product_name = '';
  price = '';
  profit_margin = '';
  sku = '';
  description = '';

  updatedProduct: any = {
    _id: '',
    product_name: '',
    price: '',
    profit_margin: '',
    sku: '',
    description: '',
  };

  product: Product;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private productId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    private productService: ProductService,
    private behaviourSub: DataSharedService
  ) {}

  ngOnInit(): void {
    // Getting single product using behaviour subject
    this.behaviourSub.product_source.subscribe(single_product=> {
      this.updatedProduct = single_product;
      if(single_product !== undefined) {
        this.mode = 'update';
      }
    })

    this.toastr.overlayContainer = this.toastContainer;
    this.productForm = this.formBuilder.group({
      // product_id: ['', [Validators.required, Validators.minLength(3)]],
      product_name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      profit_margin: ['', [Validators.required, Validators.minLength(10)]],
      sku: ['', [Validators.required, Validators.minLength(3)]],
    });

    //****************** Patch single product *****************
    this.productForm.patchValue({
      product_name: this.updatedProduct.product_name,
      price: this.updatedProduct.price,
      profit_margin: this.updatedProduct.profit_margin,
      sku: this.updatedProduct.sku,
      description: this.updatedProduct.description,
    });

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("productId")) {
    //     this.mode = "edit";
    //     this.productId = paramMap.get("productId");
    //     this.isLoading = true;
    //     this.productService.getProduct(this.productId).subscribe(productData => {
    //       this.isLoading = false;
    //       this.product = {
    //         id: productData._id,
    //         product_name: productData.product_name,
    //         price: productData.price,
    //         profit_margin: productData.profit_margin,
    //         sku: productData.sku,
    //         description: productData.description,
    //       };
    //       this.form.setValue({
    //         product_name: this.product.product_name,
    //         price: this.product.price,
    //         profit_margin: this.product.profit_margin,
    //         sku: this.product.sku,
    //         description: this.product.description,
    //       });
    //     });
    //   } else {
    //     this.mode = "create";
    //     this.productId = null;
    //   }
    // });
  }

  // onSubmit
  onSubmit(form: any) {
    console.log('add product====', form);

    // if (this.productForm.invalid) {
    //   return;
    // }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.productService.addProduct(
        form.value.product_name,
        form.value.price,
        form.value.profit_margin,
        form.value.sku,
        form.value.description
      );
    } else {
      console.log('updated mode call');

      let update_single_product = {
        _id: this.updatedProduct._id,
        product_name: form.value.product_name,
        price: form.value.price,
        profit_margin: form.value.profit_margin,
        sku: form.value.sku,
        description: form.value.description,
      };
      this.productService.updateProduct(update_single_product);
    }
  }
}
