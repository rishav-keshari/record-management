import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemModel } from '../model/item.model';
import { PartyModel } from '../model/party.model';
import { PurchaseModel } from '../model/purchase.model';
import { ApiService } from '../shared/api.service';
import { map,startWith } from "rxjs/operators";
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { RouterService } from '../shared/router.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {



  constructor( private formBuilder : FormBuilder, private apiService : ApiService,private routerService :RouterService) { }

  formValue = new FormGroup({});
  purchaseModelObj : PurchaseModel = new PurchaseModel();


  
  partyDetails = new Array<PartyModel>();
  filteredPartyOptions : Array<string> =[];
  partyOptions : Array<string> = [];
  partyMap : Map<string,PartyModel> = new Map();

  itemDetails = new Array<ItemModel>() ;
  filteredItemOptions : Array<string> =[];
  itemOptions : Array<string> = [];
  itemMap : Map<string,ItemModel> = new Map();
  // partyModelObj : any;

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      billDate :[''],
      partyName : [''],
      address : [''],
      gstNum : [''],
      cust_billDate :[''],
      invoiceNum : [''],
      itemName :[''],
      hsnCode : [''],
      purchaseBag : [''],
      purchaseWeight : [''],
      taxFreeValue : [''],
      taxInvoiceValue : [''],
      cgst : [''],
      sgst : [''],
      igst : [''],
      tds : [''],
      tcs : [''],
      grandTotal :['']

    })
    
    

    let date : Date = new Date();
    let date1 = formatDate(date, 'yyyy-MM-dd', 'en-US');
    console.log(date1)
    this.formValue.patchValue({'billDate':date1})

    this.getItemDetails();
    this.getPartyDetails();

    // this.filteredPartyOptions = this.controlPartyName.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)))

    

    this.formValue.get('partyName')?.valueChanges.subscribe(res=>{
      const temp = res.toLowerCase();
      this.formValue.patchValue({'address':this.partyMap.get(temp)?.address,'gstNum':this.partyMap.get(temp)?.gstNum})
      this.filterParty(res);
    })

    this.formValue.get('itemName')?.valueChanges.subscribe(res=>{
      const temp1 = res.toLowerCase();
      this.formValue.patchValue({'hsnCode':this.itemMap.get(temp1)?.hsnCode})
      this.filterItem(res);
    })

  }
  setTotal(event: Event) {
    const tcsValue = (event.target as HTMLInputElement).value;
    const total = +(this.formValue.value.taxFreeValue as number)
                      + +(this.formValue.value.taxInvoiceValue as number)
                      + +(this.formValue.value.cgst as number)
                      + +(this.formValue.value.sgst as number)
                      + +(this.formValue.value.igst as number)
                      + +(this.formValue.value.tds as number)
                      + +(this.formValue.value.tcs as number)
    this.formValue.patchValue({'grandTotal':total.toFixed(2)})
  }

  //ngOnit ends

  // setAdd(event : Event) {
  //   const var_PartyName = event.option.value;
  //   const temp : string = var_PartyName.toLowerCase();
  //   console.log("inside setAdd" +temp);
    
  // }

  filterParty(data : string){
    this.filteredPartyOptions = this.partyOptions.filter(party =>{
      return party.toLowerCase().indexOf(data.toLowerCase()) > -1
    })
  }

  filterItem(data : string){
    this.filteredItemOptions = this.itemOptions.filter(item =>{
      return item.toLowerCase().indexOf(data.toLowerCase()) > -1
    })
  }

  // private _filter(value : string): string[]{
  //   const filterValue = value.toLowerCase()
  //   return this.partyOptions.filter(option =>
  //     option.toLowerCase().includes(filterValue))
  // }

  // displayFn(subject : any){
  //   return subject ? subject.partyName : undefined;
  // }
  

  // select(event: Event) {
  //   const gstValue = (event.target as HTMLInputElement).value;
  //   console.log(gstValue)
    // const gstCode : string = gstValue.slice(0,2);
    // this.formValue.patchValue({'state':this.stateCode.get(gstCode)})
  // }



  addPurchaseDetails(){
    console.log("Billdate-" + this.formValue.value.billDate);
    console.log("CUST Billdate-" + this.formValue.value.cust_billDate);
    this.purchaseModelObj.billDate = formatDate(this.formValue.value.billDate,'yyyy-MM-dd', 'en-US');
    this.purchaseModelObj.partyName = this.formValue.value.partyName.trim();
    this.purchaseModelObj.address = this.formValue.value.address.trim();
    this.purchaseModelObj.gstNum = this.formValue.value.gstNum.trim();
    this.purchaseModelObj.cust_billDate = formatDate(this.formValue.value.cust_billDate, 'yyyy-MM-dd', 'en-US');
    this.purchaseModelObj.invoiceNum = this.formValue.value.invoiceNum.trim();
    this.purchaseModelObj.itemName = this.formValue.value.itemName.trim();
    this.purchaseModelObj.hsnCode = this.formValue.value.hsnCode.trim();
    this.purchaseModelObj.purchaseBag = this.formValue.value.purchaseBag.trim();
    this.purchaseModelObj.purchaseWeight = this.formValue.value.purchaseWeight.trim();
    this.purchaseModelObj.taxFreeValue = this.formValue.value.taxFreeValue.trim();
    this.purchaseModelObj.taxInvoiceValue = this.formValue.value.taxInvoiceValue.trim();
    this.purchaseModelObj.cgst = this.formValue.value.cgst.trim();
    this.purchaseModelObj.sgst = this.formValue.value.sgst.trim();
    this.purchaseModelObj.igst = this.formValue.value.igst.trim();
    this.purchaseModelObj.tds = this.formValue.value.tds.trim();
    this.purchaseModelObj.tcs = this.formValue.value.tcs.trim();
    this.purchaseModelObj.grandTotal = this.formValue.value.grandTotal.trim();


    this.apiService.postPurchase(this.purchaseModelObj)
    .subscribe(res=>{
      alert("Purchase Details Added!");
      console.log(res);
      this.ngOnInit();
    },
    err=>{
      alert("Something went wrong");
      console.log(err);
    })
  }





  getPurchaseDetails(){
    this.apiService.getPurchase()
    .subscribe(res=>{
      console.log(res)
    },
    err=>{
      alert("Something went wrogn!!");
      console.log(err);
    })
  }






  getPartyDetails(){
    this.apiService.getParty()
    .subscribe(res=>{
      this.partyDetails = res;
      this.filteredPartyOptions = [];
      this.partyOptions = [];
      this.partyDetails.forEach((party) =>{
        this.partyOptions.push(party.partyName);
        this.filteredPartyOptions.push(party.partyName);
        this.partyMap.set(party.partyName.toLowerCase(),party);
      })
      console.log(this.partyOptions)
    },
    err=>{
      alert("Error fetching Party Details!")
    })
  }







  getItemDetails(){
    this.apiService.getItem()
    .subscribe(res=>{
      this.itemDetails = res;
      this.filteredItemOptions = [];
      this.itemOptions = [];
      this.itemDetails.forEach((item) =>{
        this.itemOptions.push(item.itemName);
        this.filteredItemOptions.push(item.itemName);
        this.itemMap.set(item.itemName.toLowerCase(),item);
      })
      console.log(this.filteredItemOptions)
    },
    err=>{
      alert("Error fetching Item Details!")
    })
  }






  routeToParty(){
    this.routerService.routeToAddParty()
  }

  routeToItem(){
    this.routerService.routeToAddItem()
  }



}
