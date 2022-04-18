import {   Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseModel } from '../model/purchase.model';
import { ApiService } from '../shared/api.service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import { SaleModel } from '../model/sale.model';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  dataSource : any;
  saleData : Array<SaleModel> = [];
  formValue = new FormGroup({});
  displayedColumns: string[] = [ 'billDate', 'partyName', 'address','itemName','saleBag','saleWeight','taxFreeValue','taxInvoiceValue','grandTotal','action'];
  exportSaleData : Array<SaleModel> = [];
  heading :Array<string> =["Id No","Bill Date",'Party Name',"Address","GST No.","Customer Bill Date","Invoice No.","Item Name","HSN Code","Bag","Weight","Tax Free Value","Tax Invoice Value","CGST","SGST","IGST","TDS","TCS","Grand Total"];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService : ApiService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      fileName : [''],
      startDate : [''],
      endDate : ['']
    })
    this.getSalesDetails();



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getSalesDetails(){
    this.apiService.getSale()
    .subscribe(res=>{
      this.saleData = res;
      this.dataSource = new MatTableDataSource(this.saleData);
      this.dataSource.sort = this.sort;
      let ref = document.getElementById("descending");
      ref?.click();
    },
    err=>{
      alert("Something went wrong!!");
      console.log(err);
    })
  }

  exportModal(){
    this.formValue.reset()
  }

  export(): void
  {
    /* pass here the table id */
    // let element = document.getElementById('excel-table');
    this.saleData.forEach((element)=>{
      console.log(element);
      //const formatStartDate =formatDate(this.formValue.value.startDate,'dd-MM-yyyy', 'en-US');
      //const formatEndDate =formatDate(this.formValue.value.endDate,'dd-MM-yyyy', 'en-US');
      // const formatStartDate =formatDate(this.formValue.value.startDate,'yyyy-MM-dd', 'en-US');
      // const formatEndDate =formatDate(this.formValue.value.endDate,'yyyy-MM-dd', 'en-US');
      //const splitDate = element.billDate.split("-",3);
      //const newBillDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
      //console.log("newBillDate:",newBillDate)
      console.log(this.formValue.value.startDate);
      if (element.billDate>=this.formValue.value.startDate && this.formValue.value.endDate){
        element.billDate= formatDate(element.billDate,'dd-MM-yyyy', 'en-US');
        this.exportSaleData.push(element);
      }

    });
    if(this.exportSaleData.length==0){
      alert("No Data Found!");  
    }
    else{
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet([],{header : this.heading});

      XLSX.utils.sheet_add_json(ws,this.exportSaleData, {skipHeader: true, origin: "A2"});
      /* generate workbook and add the worksheet */
      //const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
      /* save to file */  
      XLSX.writeFile(wb, this.formValue.value.fileName+'.xlsx');
    }
    this.exportSaleData = [];
    let ref = document.getElementById("cancel");
    ref?.click();
    this.formValue.reset();
  }

}
