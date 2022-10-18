# Process_Monitoring_System
after pulling the repo make sure to put your server ip in environtment file
for frontend server(frontend-server/src/app/services/process.service.ts)

after that,run sudo /bin/bash install.sh

to test it
move to the test folder
1-run the command 
sudo /bin/bash test.sh 
this will create a process that will throw an exception after almost 150 seconds
2-run ps -aux | grep "test"
3-read the pid
4-open the front server ip:4202
5-fill the form to create the process (try to make it before the 150 seconds )
6-wait for the email
7-concerning the telegram notification you should create your own bot to obtain token and chat id



