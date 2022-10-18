import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
//we've defined our base url here in the env
import {map} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ProcessService {

   baseURL:string="http://your_server_ip:3002";//on server 
  //baseURL:string="http://localhost:3002";//locally
  constructor(private httpClient: HttpClient) { }

  createProcess(monitored_process:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(monitored_process);
    return this.httpClient.post(this.baseURL+"/process/create",body,{'headers':headers});
  }



  
}

