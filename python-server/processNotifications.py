
import requests
import time
import json

URL = "http://nginx-container:80/backend"+"/notification/";
notification_list_api=URL+"all"
notification_send_api=URL+"send"
while True:
    try:
        response = (requests.get(notification_list_api)).text
        data=json.loads(response)
        notifications=data["notification_list"]
        for notification in notifications:
            r = requests.post(url = notification_send_api, data = notification)
            if(r.status_code==200):
                print("notification processed successfullyy");
            r=r.text
    except Exception as e:
        print("Exception:"+str(e))

    time.sleep(5);
