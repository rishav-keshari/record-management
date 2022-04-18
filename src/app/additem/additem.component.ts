import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ItemModel } from '../model/item.model';
import { ApiService } from '../shared/api.service';



@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  dataSource :any;
  itemData = new Array<ItemModel>();
  itemModelObj : ItemModel = new ItemModel();
  formValue = new FormGroup({});
  showAdd : boolean =false;
  showUpdate : boolean = false;

  displayedColumns: string[] = [ 'itemName', 'hsnCode', 'action'];
  constructor(private formBuilder:FormBuilder, private apiService : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      itemName : [''],
      hsnCode : [''],
      stockBag : [0],
      stockWeight : [0]
    })
    this.getItemDetails();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  addItemDetails(){
    this.itemModelObj.itemName = this.formValue.value.itemName.trim();
    this.itemModelObj.hsnCode = this.formValue.value.hsnCode.trim();
    this.itemModelObj.stockBag = this.formValue.value.stockBag.trim();
    this.itemModelObj.stockWeight = this.formValue.value.stockWeight.trim();


    this.apiService.postItem(this.itemModelObj)
    .subscribe(res=>{
      console.log(res)
      alert("Item "+res.itemName+" added Successfully!");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.getItemDetails();
      this.formValue.reset();
    },
    err=>{
      alert("Something went wrong!!");
    })
  }


  getItemDetails(){
    this.apiService.getItem()
    .subscribe(res=>{
      this.itemData = res;
      this.dataSource = new MatTableDataSource(this.itemData);
    },
    err=>{
      console.log("Error fetching Data!!!")
    })
  }


  deleteItemDetails(element : ItemModel){
    console.log(element);
    this.apiService.deleteItem(element.id)
    .subscribe(res=>{
      console.log(res);
      alert("Item "+element.itemName+" deleted!");
      this.getItemDetails();
    },
    err=>{
      console.log(err);
      alert("Could not delete!")
    })

  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;

    this.itemModelObj.id = row.id;
    this.formValue.controls['itemName'].setValue(row.itemName);
    this.formValue.controls['hsnCode'].setValue(row.hsnCode);
    this.formValue.controls['stockBag'].setValue(row.stockBag);
    this.formValue.controls['stockWeight'].setValue(row.stockWeight);


  }

  updateItemDetails(){
    this.itemModelObj.itemName = this.formValue.value.itemName.trim();
    this.itemModelObj.hsnCode = this.formValue.value.hsnCode.trim();
    this.itemModelObj.stockBag = this.formValue.value.stockBag.trim();
    this.itemModelObj.stockWeight  =this.formValue.value.stockWeight.trim();

    this.apiService.updateItem(this.itemModelObj,this.itemModelObj.id)
    .subscribe(res=>{
      alert("Item "+res.itemName+" updated!")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getItemDetails();
    },
    err=>{
      alert("Something went wrong!");
      console.log(err);
    })


  }

  clickAddItem(){
    this.formValue.reset();
    this.itemModelObj.id=0;
    this.showAdd = true;
    this.showUpdate = false;
  }

}
