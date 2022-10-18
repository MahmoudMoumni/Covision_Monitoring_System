from datetime import date
import os

class MonitoredProcess:
    def __init__(self,process_db_id,host_machine_id,pid,log_file):
        self.process_db_id=process_db_id
        self.host_machine_id = host_machine_id
        self.pid = pid
        self.log_file=log_file
        self.alive=True
        self.running_time_sec=0
        self.error_info=""

    def display_info(self):
        print(f' process_db_id: {self.process_db_id} host_machine_id:{self.host_machine_id} \n pid: {self.pid} \n alive: {self.alive} \n running_time:{self.running_time_sec} \n error_info:{self.error_info} \n log_file: {self.log_file} ')

    def get_data(self):
        return self.process_db_id,self.host_machine_id,self.pid,self.alive,self.running_time_sec,self.error_info

    def update_process(self,status,running_time):
        self.alive=status
        if self.alive:
            self.running_time_sec=running_time

    def parse_process_time(self,time_str):
        running_time_sec=0
        time_fragments=time_str.split('-')
        if len(time_fragments)==2:
            running_time_sec+=int(time_fragments[0])*86400
            elapsed_time_fragments=time_fragments[0].split(':')
            if len(elapsed_time_fragments)==3:
                running_time_sec+=int(elapsed_time_fragments[0])*3600
                running_time_sec+=int(elapsed_time_fragments[1])*60
                running_time_sec+=int(elapsed_time_fragments[2])
        elif len(time_fragments)==1:
            elapsed_time_fragments=time_fragments[0].split(':')
            if len(elapsed_time_fragments)==3:
                running_time_sec+=int(elapsed_time_fragments[0])*3600
                running_time_sec+=int(elapsed_time_fragments[1])*60
                running_time_sec+=int(elapsed_time_fragments[2])
        return running_time_sec

    def parse_error_log_file(self):
        cmd="tail -3l "+str(self.log_file)
        error_info = os.popen(cmd).read().replace("\n", " ")
        print("parsing file")
        print(error_info)      
        self.error_info=error_info   

    def is_alive(self):
        return self.alive;
        
    def is_running(self):
        cmd="ps -p "+str(self.pid)+" --no-headers | awk '{print $1,$3 }' "
        output = os.popen(cmd).read().rstrip().split(' ')
        #print("output")
        #print(output)
        if len(output)==2:
            pid=int(output[0])
            elpased_time=output[1]
            if(pid==self.pid):
                running_time_sec=self.parse_process_time(elpased_time)
                self.update_process(True,running_time_sec)
                return True
            else :
                self.update_process(False,0)
                self.parse_error_log_file()
                return False
        else:
            self.update_process(False,0)
            self.parse_error_log_file()
            return False

        