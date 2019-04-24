"use strict";
const express = require('express');
const jobSchema = require('./app/models/job');
const app = express();
app.use(express.json())
const router = express.Router();

let jobList = [];
router.get('/', function(req,res){
    return res.status(200).send('Welcome to Job Portal');
});

router.get('/jobs', function(req,res){
    return res.status(200).send(jobList);
});

router.post('/jobs', function(req, res){
    jobList.push(new jobSchema(jobList.length,
                               req.body.designation,
                               req.body.company_name,
                               req.body.location));
   return res.status(200).send(jobList);
});

router.put('/jobs/:id',function(req, res){
    const id = req.params.id;
    if(jobList[id]){
    jobList[id].designation = req.body.designation;
    jobList[id].company_name = req.body.company_name;
    jobList[id].location = req.body.location;
    return res.status(200).send(jobList[id]);
    }
    return res.status(404).send(`No record with id: ${id}`)
});

router.delete('/jobs/:id', function(req, res){
    
    const deletedRecord = jobList.splice(req.params.id,1);
    res.send(deletedRecord);
})

app.use('/', router);
app.listen(6677);
console.log("Node Server listening on port 6677");