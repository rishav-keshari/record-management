import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemModel } from '../model/item.model';
import { PartyModel } from '../model/party.model';
import { PurchaseModel } from '../model/purchase.model';
import { SaleModel } from '../model/sale.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient) { }

  postParty(data : PartyModel) : Observable<PartyModel>{
    return this.httpClient.post<PartyModel>('http://localhost:3000/party',data)
  }

  getParty(): Observable<PartyModel[]>{
    return this.httpClient.get<PartyModel[]>('http://localhost:3000/party')
  }

  updateParty(data : PartyModel, id : number):Observable<PartyModel>{
    return this.httpClient.put<PartyModel>("http://localhost:3000/party/"+id,data)
  }

  deleteParty(id :number):Observable<any>{
    return this.httpClient.delete<any>('http://localhost:3000/party/'+id)
  }

  postItem(data:ItemModel):Observable<ItemModel>{
    return this.httpClient.post<ItemModel>('http://localhost:3000/item',data)
  }

  getItem():Observable<ItemModel[]>{
    return this.httpClient.get<ItemModel[]>('http://localhost:3000/item')
  }

  updateItem(data : ItemModel, id :number):Observable<ItemModel>{
    return this.httpClient.put<ItemModel>('http://localhost:3000/item/'+id,data)
  }

  deleteItem(id : number):Observable<ItemModel>{
    return this.httpClient.delete<ItemModel>('http://localhost:3000/item/'+id)
  }

  postPurchase(data : PurchaseModel): Observable<PurchaseModel>{
    return this.httpClient.post<PurchaseModel>('http://localhost:3000/purchase',data);
  }

  getPurchase():Observable<PurchaseModel[]>{
    return this.httpClient.get<PurchaseModel[]>('http://localhost:3000/purchase');
  }

  updatePurchase(id: number,data : PurchaseModel):Observable<PurchaseModel>{
    return this.httpClient.put<PurchaseModel>('http://localhost:3000/purchase/'+id,data)
  }

  deletePurchase(id : number):Observable<PurchaseModel>{
    return this.httpClient.delete<PurchaseModel>('http://localhost:3000/purchase/'+id)
  }

  postSale(data : SaleModel ): Observable<SaleModel>{
    return this.httpClient.post<SaleModel>('http://localhost:3000/sale',data);
  }

  getSale():Observable<SaleModel[]>{
    return this.httpClient.get<SaleModel[]>('http://localhost:3000/sale');
  }

  updateSale(id: number,data : SaleModel):Observable<SaleModel>{
    return this.httpClient.put<SaleModel>('http://localhost:3000/sale/'+id,data)
  }

  deleteSale(id : number):Observable<SaleModel>{
    return this.httpClient.delete<SaleModel>('http://localhost:3000/sale/'+id)
  }


  
}
