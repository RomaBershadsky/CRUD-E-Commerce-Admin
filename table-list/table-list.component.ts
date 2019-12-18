import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../classes/product';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  img = '';
  price = '';
  name = '';
  description = '';
  category = '';

  selectedProduct: Product;
  newArrivals: Product[];
  constructor(private productServ: CartService) { }
  @Input() product: Product;


  //create product collection - for display
  ngOnInit() {
    this.productServ.getProducts().subscribe(data => {
      this.newArrivals = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      })
    });
  }

  // create product
  create(category: string, name: string, img: string, price: string, description: string) {
    const product: Product = {
      category: category,
      name: name,
      img: img,
      price: price,
      description: description
    }
    this.productServ.createProduct(product);
  }

  // update existing product
  update(product: Product) {
    console.log(product);
    this.productServ.updateProduct(product);
  }
  updateProduct: Product
  sendUpdate(product: Product) {
    this.updateProduct = product
  }
  // delete exiting product
  delete(id: string) {
    this.productServ.deleteProduct(id);
  }
}
