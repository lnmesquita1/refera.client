import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Order } from './models/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public orders = [];
  public form: FormGroup;
  public displayModal = false;
  public listOrders = [];
  showLoader = false;
  categories = [];

  constructor(private fb: FormBuilder, private service: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.newOrderForm();
    this.findAllOrders();
  }

  newOrderForm() {
    this.form = this.fb.group(new Order());
    this.setValidations(this.form, this.validationsForm());
  }

  showModalDialog(order = null) {
    this.displayModal = true;
    this.findAllCategories();
    if (order) {
      this.form = this.fb.group(order);
      this.form.controls.deadline.setValue(new Date(this.form.controls.deadline.value))
      this.setValidations(this.form, this.validationsForm());
    }
  }

  createNewOrderActionButton() {
    this.showModalDialog();
  }

  createOrder() {
    this.displayModal = false;
    if (this.form.valid) {
      this.showLoader = true;
      this.service.createOrder(this.form.value).subscribe(() => {
        this.findAllOrders();
        this.newOrderForm();
        const options = {
          severity:'success', 
          summary: 'Success', 
          detail: 'Your order has been saved successfully',
          life: 5000
        };
        this.showLoader = false;
        this.showMessage(options);
      },
      (error) => {
        const options = {
          severity:'error', 
          summary: 'Error', 
          detail: error?.message,
          life: 5000
        };
        this.showLoader = false;
        this.showMessage(options);
      });
    }
  }

  findAllOrders() {
    this.showLoader = true;
    this.service.findAllOrders().subscribe(
      (res: any) => {
        if (res.data) {
          const list = res.data;
          if (list) {
            this.listOrders = list;
          }
        }
        this.showLoader = false;
      },
      (error) => {
        const options = {
          severity:'error', 
          summary: 'Error on find orders', 
          detail: error?.message,
          life: 5000
        };
        this.showLoader = false;
        this.showMessage(options);
      }
    );
  }

  findAllCategories() {
    this.showLoader = true;
    this.service.findAllCategories().subscribe(
      (res: any) => {
        if (res.data) {
          const list = res.data;
          if (list) {
            this.categories = list;
          }
        }
        this.showLoader = false;
      },
      (error) => {
        const options = {
          severity:'error', 
          summary: 'Error on find categories', 
          detail: error?.message,
          life: 5000
        };
        this.showLoader = false;
        this.showMessage(options);
      }
    );
  }

  showMessage(options) {
    this.messageService.add(options);
  }

  validationsForm() {
    const result = {
      name: Validators.required,
      celPhone: Validators.required,
      category: Validators.required,
      agency: Validators.required,
      description: Validators.required,
      company: Validators.required,
      deadline: Validators.required
    };
    return result;
  }

  setValidations(form: FormGroup, validations: any) {
    for (const key in form.controls) {
      const validation = validations[key] ? validations[key] : null;
      form.controls[key].setValidators(validation);
      form.controls[key].updateValueAndValidity();
    }
  }

}
