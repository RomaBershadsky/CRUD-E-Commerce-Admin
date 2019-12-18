import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore) { }
  getProducts() {
    return this.firestore.collection('newArrivals').snapshotChanges();
  }
  createProduct(product: Product) {
    return this.firestore.collection('newArrivals').add(product);
  }
  updateProduct(product: any) {
    this.firestore.doc('newArrivals/' + product.id).update(product);
  }
  deleteProduct(productName: string) {
    this.firestore.doc('newArrivals/' + productName).delete();
  }
}
