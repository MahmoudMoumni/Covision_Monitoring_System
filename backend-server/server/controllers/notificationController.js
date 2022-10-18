
const db = require('../config/db.config.js');
const Notification = db.Notification;
const Process = db.Process;
const emailSender=require('../channels/emailSender')
const axios = require('axios');

createNotification = (req, res) => {
    Notification.create({
        process_db_id: req.body.process_db_id,
        error_message:  req.body.error_message,
        running_time_sec: req.body.running_time_sec,
        status:false
    }).then(notification => {
        //notification=notification.dataValues;
        res.status(200).json({
            msg:'notification created successfully'
        });       
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}

//update notification status to true (read)
updateNotification = (req, res) => {
    console.log("updateNotification");
    let notification_id=req.body.notification_id;
    Notification.update(
        {
            status:true
        },
        {
            where:{id:notification_id}
        }
    ).then(notification => {
        //notification=notification.dataValues;
        res.status(200).json({
            msg:'notification updated successfully'
        });       
    }).catch(err => {
        console.log(err);
        res.status(500).send("Fail! Error -> " + err);
    })
}

function desactivateNotification(notification_id) {
    console.log("desactivateNotification");
    console.log("notification_id");
    console.log(notification_id);
    return Notification.update(
        {
            status:1
        },
        {
            where:{id:notification_id}
        }).then(notification => {
            console.log("yessssssssssssssss");
            return true;
        }).catch(err => {
            console.log("nooooooooooooooooo");
            return false;
        })
    
}

function  sendNotificationByMail(notification_message,email_params){
    let receivers=parseInt(email_params.receivers);
    for(let i=0;i<receivers;i++){
        let mail_address=email_params.list_emails[i];
        var mailOptions = {
            from: 'mahmoudmoumni12340@gmail.com',
            to: mail_address,
            subject: 'Process notification',
            text: notification_message
        };
        let result=emailSender.sendMail(mailOptions);
        if(!result)return false;
    }
    return true;
}

function  sendNotificationByTelegram(notification_message,telegram_params){
    const url = 'https://api.telegram.org/bot';
    let text = notification_message;
    let receivers=parseInt(telegram_params.receivers);
    for(let i=0;i<receivers;i++){
        let apiToken=telegram_params.list_telegrams[i].token;
        let chatId =telegram_params.list_telegrams[i].chat_id;
        console.log(apiToken);
        console.log(chatId);
        axios.post(`${url}${apiToken}/sendMessage`,
            {
                chat_id: chatId,
                text: text
            })
            .then((response) => { 
                console.log(response);
               
            }).catch((error) => {
                console.log(error);
              
            });
    }
    return 1;
}

function processNotificationTypes(notification,notification_params){
    notification_message="Process with PID "+String(notification.process_db_id)+" has stopped after being running for "+String(notification.running_time_sec)+" ";
    notification_message=notification_message+"\n error message is : "+String(notification.error_message);
    let result=true;
    if(notification_params.hasOwnProperty("email")){
         result=sendNotificationByMail(notification_message,notification_params.email);
    }
    if(notification_params.hasOwnProperty("telegram")){        
        result=sendNotificationByTelegram(notification_message,notification_params.telegram);
    }
    //add other channels

    return true;
}

//update notification status to true (read)
sendNotification = (req, res) => {
    console.log("sendNotification");
    let notification=req.body;
    console.log(notification);
    let process_db_id=notification.process_db_id;
    console.log(process_db_id);
    Process.findOne({
        where:{id:process_db_id}
    })
      .then(process => {
            process=process.dataValues;
            let process_notification_params=JSON.parse(process.notification_params);
            let desactivation_result=desactivateNotification(notification.id);
            let result=processNotificationTypes(notification,process_notification_params);
            if(desactivation_result){
                return res.status(200).json({
                    message:"notification was sent successfully"
                });
            }
            else{
                return res.status(500).json({ message:"error desactivation notifs" });
            }
            
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
}

getListNotification = (req, res) => {
    console.log("getListNotification");
    Notification.findAll({where:{
        status:false
    }})
      .then(notification_list => {
        console.log("notification_list");
        //console.log(notification_list);
        return res.status(200).json({
            notification_list:notification_list
        });
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
  };

const notificatioController = {};
notificatioController.createNotification = createNotification;
notificatioController.getListNotification = getListNotification;
notificatioController.updateNotification = updateNotification;
notificatioController.sendNotification = sendNotification;
module.exports = notificatioController;