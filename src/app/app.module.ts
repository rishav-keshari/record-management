import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,  Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdditemComponent } from './additem/additem.component';
import { AddpartyComponent } from './addparty/addparty.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select/';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { RouterService } from './shared/router.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule} from '@angular/material/table';
import { ApiService } from './shared/api.service';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';
import { ReportComponent } from './report/report.component';
import { MatSortModule } from '@angular/material/sort';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';



const routes : Routes=[
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path:'',
    component:PurchaseComponent
  },
  {
    path:'additem',
    component:AdditemComponent
  },
  {
    path: 'addparty',
    component: AddpartyComponent
  },
  {
    path: 'addpurchase',
    component:PurchaseComponent
  },
  {
    path: 'report',
    component:ReportComponent
  },
  {
    path: 'addsale',
    component:SaleComponent
  },
  {
    path:'sales-report',
    component:SalesReportComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    AdditemComponent,
    AddpartyComponent,
    PurchaseComponent,
    ReportComponent,
    SaleComponent,
    SalesReportComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule

  ],
  providers: [RouterService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
