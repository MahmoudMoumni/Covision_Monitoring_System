import os
import time
from process import MonitoredProcess
import json
from os import listdir
from os.path import isfile, join
import requests 

class MonitoringSystem:
    def __init__(self,backend_url):
        self.process_list=[]
        self.backend_url=backend_url

    def add_process(self,proc):
        self.process_list.append(proc)

    def load_process_list_from_json(self):
        self.process_list=[]
        f = open('./processes.json')
        data = json.load(f)
        for proc in data['process_list']:
            process_db_id=proc['id']
            host_machine_id=proc['host_machine_id']
            pid=proc['pid']
            log_file=proc['log_file']
            monitored_process=MonitoredProcess(process_db_id,host_machine_id,pid,log_file)
            self.add_process(monitored_process)

    def load_process_list(self):
        self.process_list=[]
        process_list_api=self.backend_url+"/process/all"
        try:
            response = (requests.get(process_list_api)).text
            data=json.loads(response)
            process_list=data["process_list"]
            for proc in process_list:
                process_db_id=proc["id"]
                host_machine_id=proc['host_machine_id']
                pid=proc['pid']
                log_file=proc['log_file']
                monitored_process=MonitoredProcess(process_db_id,host_machine_id,pid,log_file)
                self.add_process(monitored_process)
                
        except Exception as e:
            print("Exception: "+str(e))

    def monitor(self):
        process_files_path="./process_files"
        notification_creation_api=self.backend_url+"/notification/create"
        
        while True:
            #todo
            processfiles = [f for f in listdir(process_files_path) if isfile(join(process_files_path, f))]
            print(processfiles)
            if(len(processfiles)):
                self.load_process_list()
            for process_file_name in processfiles:
                os.remove(join(process_files_path, process_file_name))
            for proc in self.process_list:
                if(not (proc.is_alive())):
                    continue
                if(proc.is_running()):
                    print("proc is running")
                    proc.display_info()
                else:
                    print("proc is dead")
                    proc.display_info()
                    #call notification creation api
                    process_db_id,host_machine_id,pid,alive,running_time_sec,error_info=proc.get_data()
                    payload={"process_db_id":process_db_id,"error_message":error_info,"running_time_sec":running_time_sec}
                    r = requests.post(url = notification_creation_api, data = payload)
                    if(r.status_code==200):
                        print("notification created successfullyy");
            time.sleep(5)




if __name__ == "__main__":
    BACKEND_URL = "http://localhost:3002"
    monitoringSystem=MonitoringSystem(BACKEND_URL)
    monitoringSystem.load_process_list()
    monitoringSystem.monitor()
    
