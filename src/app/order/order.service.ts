import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REFERA_API } from '../refera.conf';
import { Order } from './models/order';

@Injectable()
export class OrderService {

	constructor(private http: HttpClient) {}
	
	createOrder(order: Order) {
    return this.http.post(
      `${REFERA_API}/api/order`, order
    );
  }

  findAllOrders() {
    return this.http.get(`${REFERA_API}/api/order/all`);
  }

  findAllCategories() {
    return this.http.get(`${REFERA_API}/api/category/all`);
  }

}