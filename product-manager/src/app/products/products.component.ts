import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  removeProduct(id: string): void {
    this.productService.removeProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  editProduct(id: string): void {
    this.router.navigate(['/update-product', id]);
  }
}
