
import sys

WorkingDirectory=sys.argv[1]
ExecScript=sys.argv[2]

service_content="[Unit] \n\
Description=Service responsible for restarting  monitoring script application \
[Service] \n\
User=root \n\
WorkingDirectory=%s \n\
ExecStart=/bin/bash %s \n\
Restart=always \n\
RestartSec=10s \n\
[Install] \n\
WantedBy=multi-user.target \n" % (WorkingDirectory, ExecScript)


service_file = open("./process_monitoring_system.service", "w")
service_file.write(service_content)
service_file.close()

