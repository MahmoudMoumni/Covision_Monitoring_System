import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProcessService} from "../services/process.service";
interface Dictionary<T> {
  [Key: string]: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    pid: [],
    host_machine_id: [],
    log_file: []

  });
  secondFormGroup = this._formBuilder.group({
    email0: [],
    email1: [],
    email2: [],
    email3: [],
    email4: [],
    email5: [],
    email6: [],
    email7: [],
    email8: [],
    email9: [],
    email10: [],
  });
  thirdFormGroup=this._formBuilder.group({
    token0: [],chat_id0: [],
    token1: [],chat_id1: [],
    token2: [],chat_id2: [],
    token3: [],chat_id3: [],
    token4: [],chat_id4: [],
    token5: [],chat_id5: [],
    token6: [],chat_id6: [],
    token7: [],chat_id7: [],
    token8: [],chat_id8: [],
    token9: [],chat_id9: [],
    token10: [],chat_id10: [],
  });
  isEditable = true;
  emailsIDs:number []=[];
  telegramsIDs:number[]=[];
  constructor(private processService: ProcessService,private _formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
  }

  public addEmail(){
    let id=0;
    while(true){
      if(this.emailsIDs.includes(id))id=id+1;
      else break;
    }
    this.emailsIDs.push(id);
  }

  public deleteEmail(emailId:number){
    let idx=this.emailsIDs.indexOf(emailId);
    if(idx>-1){
      this.emailsIDs.splice(idx,1);
    }
  }

  public addTelagram(){
    let id=0;
    while(true){
      if(this.telegramsIDs.includes(id))id=id+1;
      else break;
    }
    this.telegramsIDs.push(id);
  }
  public deleteTelagram(telegramId:number){
    let idx=this.telegramsIDs.indexOf(telegramId);
    if(idx>-1){
      this.telegramsIDs.splice(idx,1);
    }
  }

  public submit(){
    let process_details=this.firstFormGroup.value;
    let emails_details=this.secondFormGroup.value;
    let telegrams_details=this.thirdFormGroup.value;

    const monitored_process :Dictionary<string> = {};
    const email_config:Dictionary<string> = {};
    const telegram_config:Dictionary<string> = {};
    const notification_params :Dictionary<string> = {};

    monitored_process["pid"]=process_details.pid;
    monitored_process["host_machine_id"]=process_details.host_machine_id;
    monitored_process["log_file"]=process_details.log_file;

    let email_receivers:number=0;
    var list_emails:string []=[];
    for(let i=0;i<=10;i++){
      if(emails_details["email"+String(i)]!=null){
          email_receivers++;
          list_emails.push(emails_details["email"+String(i)]);
      }
    }
    email_config["receivers"]=(email_receivers);
    email_config["list_emails"]=list_emails;
    notification_params["email"]=email_config;

    let telegram_receivers:number=0;
    var list_telegrams:Dictionary<string> []=[];
    for(let i=0;i<=10;i++){
      if(telegrams_details["token"+String(i)]!=null){
          telegram_receivers++;
          var telegram_channel:Dictionary<string>={};
          telegram_channel["token"]=telegrams_details["token"+String(i)];
          telegram_channel["chat_id"]=telegrams_details["chat_id"+String(i)];
          list_telegrams.push(telegram_channel);
      }
    }
    telegram_config["receivers"]=(telegram_receivers);
    telegram_config["list_telegrams"]=list_telegrams;
    notification_params["telegram"]=telegram_config;

    
    monitored_process["notification_params"]=notification_params;
    console.log("monitored_process");
    console.log(monitored_process);
    this.processService.createProcess(monitored_process)
    .subscribe((res)=>{
      if(res){
        console.log("process created");
        console.log(res);
      }
    })
  }

}
