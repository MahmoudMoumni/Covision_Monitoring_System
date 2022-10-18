
const fs = require('fs');
const db = require('../config/db.config.js');
const Process = db.Process;

function createNewProcessFile(process){
    if(process!=null){
      let process_db_id=process.id;
      let pid=process.pid;
      timestamp=Date.now();
      jsDate = new Date(timestamp);
      jsDateValues = [
         jsDate.getFullYear(),
         jsDate.getMonth()+1,
         jsDate.getDate(),
         (jsDate.getHours()+1)%24,
         jsDate.getMinutes(),
         jsDate.getSeconds(),
      ];
      date="";
      let len=jsDateValues.length;
      for(let i=0;i<len;i++){
        let intval=parseInt(jsDateValues[i]);
        if(intval<10)jsDateValues[i]="0"+jsDateValues[i];
      }
      for(let i=0;i<len;i++){
        date=date+jsDateValues[i];
        if(i<(len-1))date=date+"-"
      }
      let process_file="/process_files/"+String(process_db_id)+"_"+String(pid)+"_"+date+".json";
      var buffer = Buffer.from(JSON.stringify(process));
      fs.writeFile(process_file, buffer,{encoding: "binary", flag: 'wx' }, (err)=>{
        if(err) {
            console.log(err)
        }
        else {
            console.log('File saved');
        }
      })
    }
}


createProcess = (req, res) => {
    console.log("createProcess");
    Process.create({
        host_machine_id: req.body.host_machine_id,
        pid:  req.body.pid,
        log_file:req.body.log_file,
        notification_params:JSON.stringify(req.body.notification_params)
    }).then(process => {
        process=process.dataValues;
        console.log(process);
        console.log(process.id);
        createNewProcessFile(process);
        res.status(200).json({
            msg:'process created successfully'
        });       
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}



getListProcess = (req, res) => {
    console.log("getListProcess");
    Process.findAll({})
      .then(process_list => {
        return res.status(200).json({
            process_list:process_list
        });
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
  };

const processController = {};
processController.getListProcess = getListProcess;
processController.createProcess = createProcess;
module.exports = processController;