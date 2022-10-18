import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
//we've defined our base url here in the env
import {map} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  baseURL:string="/backend";//on server 
  constructor(private httpClient: HttpClient) { }
  createProcess(monitored_process:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(monitored_process);
    return this.httpClient.post(this.baseURL+"/process/create",body,{'headers':headers});
  }



  
}

