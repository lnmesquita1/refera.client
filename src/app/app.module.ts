import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { OrderService } from './order/order.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    OrderService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
