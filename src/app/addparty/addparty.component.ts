import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import { PartyModel } from '../model/party.model';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-addparty',
  templateUrl: './addparty.component.html',
  styleUrls: ['./addparty.component.css']
})
export class AddpartyComponent implements OnInit {


  dataSource :any;
  partyModelObj : PartyModel = new PartyModel();
  formValue = new FormGroup({});
  partyData = new Array<PartyModel>();
  showAdd : boolean =false;
  showUpdate : boolean = false;

  states : Array<string> = new Array<string>("Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam");
  stateCode : Map<string,string> = new Map([["01","Jammu and Kashmir"],["02","Himachal Pradesh"],["03","Punjab"],["04","Chandigarh"],["05","Uttarakhand"],
  ["06","Haryana"],["07","Delhi"],["08","Rajasthan"],["09","Uttar Pradesh"],["10","Bihar"],["11","Sikkim"],["12","Arunachal Pradesh"],
  ["13","Nagaland"],["14","Manipur"],["15","Mizoram"],["16","Tripura"],["17","Meghalaya"],["18","Assam"],["19","West Bengal"],["20","Jharkhand"],["21","Orissa"],
["22","Chhattisgarh"],["23","Madhya Pradesh"],["24","Gujarat"],["25","Daman and Diu"],["26","Dadra and Nagar Haveli & Daman and Diu"],["27","Maharashtra"],["29","Karnataka"],["30","Goa"],
["31","Lakshadweep"],["32","Kerala"],["33","Tamilnadu"],["34","Puducherry"],["35","Andaman and Nicobar Islands"],["36","Telangana"],["37","Andhra Pradesh"],["38","Ladakh"],["97","Other"]]);

  displayedColumns: string[] = [ 'partyName', 'address', 'gstNum','state','action'];


  constructor(private formBuilder : FormBuilder,private apiService : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      partyName :[''],
      address :[''],
      gstNum : [''],
      state :['']
    })

    this.getPartyDetails();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
  setState(event: Event) {
    const gstValue = (event.target as HTMLInputElement).value;
    const gstCode : string = gstValue.slice(0,2);
    this.formValue.patchValue({'state':this.stateCode.get(gstCode)})
  }
  


  

  addPartyDetails(){
    this.partyModelObj.partyName = this.formValue.value.partyName.trim();
    this.partyModelObj.address = this.formValue.value.address.trim();
    this.partyModelObj.gstNum = this.formValue.value.gstNum.trim();
    this.partyModelObj.state  =this.formValue.value.state.trim();

    this.apiService.postParty(this.partyModelObj)
    .subscribe(res=>{
      console.log(res)
      alert("Party "+res.partyName+" added Successfully!");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.getPartyDetails();
      this.formValue.reset();

    },
    err=>{
      alert("Something went wrong!!");
    })

  }

  getPartyDetails(){
    this.apiService.getParty()
    .subscribe(res=>{
      this.partyData = res;
      this.dataSource = new MatTableDataSource(this.partyData);
    },
    err=>{
      console.log("Error fetching Data!!!")
    })
  }

  deletePartyDetails(element : PartyModel){
    console.log(element);
    this.apiService.deleteParty(element.id)
    .subscribe(res=>{
      console.log(res);
      alert("Party "+element.partyName+" deleted!");
      this.getPartyDetails();
    },
    err=>{
      console.log(err);
      alert("Could not delete!")
    })

  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;

    this.partyModelObj.id = row.id;
    this.formValue.controls['partyName'].setValue(row.partyName);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['gstNum'].setValue(row.gstNum);
    this.formValue.controls['state'].setValue(row.state);


  }

  updatePartyDetails(){
    this.partyModelObj.partyName = this.formValue.value.partyName.trim();
    this.partyModelObj.address = this.formValue.value.address.trim();
    this.partyModelObj.gstNum = this.formValue.value.gstNum.trim();
    this.partyModelObj.state  =this.formValue.value.state.trim();

    this.apiService.updateParty(this.partyModelObj,this.partyModelObj.id)
    .subscribe(res=>{
      alert("Party "+res.partyName+" updated!")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getPartyDetails();
    },
    err=>{
      alert("Something went wrong!");
      console.log(err);
    })


  }

  clickAddParty(){
    this.formValue.reset();
    this.partyModelObj.id=0;
    this.showAdd = true;
    this.showUpdate = false;
  }


  
}
