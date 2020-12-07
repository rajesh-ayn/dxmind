import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  productData: any = {
    id: '',
    product_name: '',
    price: '',
    profit_margin: '',
    sku: '',
    description: '',
  };

  private productsUpdated = new Subject<{
    products: Product[];
    productCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  productList() {
    return this.http.get<{
      message: string;
      products: any;
      maxProducts: number;
    }>('http://localhost:3000/api/products');
  }

  getProducts(productsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        'http://localhost:3000/api/products' + queryParams
      )
      .pipe(
        map((productData) => {
          return {
            products: productData.products.map((product) => {
              return {
                name: product.name,
                description: product.description,
                id: product._id,
                price: product.price,
                quantity: product.quantity,
              };
            }),
            maxProducts: productData.maxProducts,
          };
        })
      )
      .subscribe((transformedProductData) => {
        this.products = transformedProductData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedProductData.maxProducts,
        });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
    }>('http://localhost:3000/api/products/' + id);
  }

  addProduct(
    product_name: string,
    price: any,
    profit_margin: any,
    sku: any,
    description: string
  ) {
    this.productData.product_name = product_name;
    this.productData.price = price;
    this.productData.profit_margin = profit_margin;
    this.productData.sku = sku;
    this.productData.description = description;

    this.http
      .post<{ message: string; product: Product }>(
        'http://localhost:3000/api/products',
        this.productData
      )
      .subscribe(
        (responseData) => {
          this.router.navigate(['/']);
        },
        (err) => {
          console.log('error =', err);
        }
      );
  }

  // *************** update product via _id ***************
  updateProduct(product) {
    let productData: any = {
      _id: '',
      product_name: '',
      price: '',
      profit_margin: '',
      sku: '',
      description: '',
    };

    productData = {
      _id: product._id,
      product_name: product.product_name,
      price: product.price,
      profit_margin: product.profit_margin,
      sku: product.sku,
      description: product.description,
    };

    this.http
      .put('http://localhost:3000/api/products/' + product._id, productData)
      .subscribe((response) => {
        console.log('updated product=', response);
        this.router.navigate(['/product-list']);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete('http://localhost:3000/api/products/' + productId);
  }
}
