#!/bin/bash

#find current dir
WorkingDirectory=`pwd`
ExecScript=$WorkingDirectory"/monitoring_system.sh"

#create monitoring_service
python3 create_monitoring_service.py $WorkingDirectory $ExecScript

#copy monitoring_service file to /etc/systemd/system
cp process_monitoring_system.service /etc/systemd/system
chmod a+x monitoring_system.sh

#build docker containers
docker-compose build
#run docker containers in detached mode
docker-compose up -d
#enable and restart process_monitoring_system service
systemctl enable process_monitoring_system.service
systemctl restart process_monitoring_system.service

