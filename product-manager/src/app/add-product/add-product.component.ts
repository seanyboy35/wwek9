import { Component } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = { id: 0, name: '', description: '', price: 0, units: 0 };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
