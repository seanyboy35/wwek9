import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product = { id: 0, name: '', description: '', price: 0, units: 0 };
  private id: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe(products => {
      const foundProduct = products.find(p => p._id === this.id);
      if (foundProduct) {
        this.product = foundProduct;
      }
    });
  }
  

  updateProduct(): void {
    this.productService.updateProduct(this.id, this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
