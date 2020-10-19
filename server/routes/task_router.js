const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "complete" DESC;';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error)=>{
        console.log("error with get request", error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    let task = req.body.name;
    let status= req.body.complete;

    let queryText = `INSERT INTO "tasks" ("name", "complete")
    VALUES('${task}', '${status}');`;

    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.delete('/:idParam', (req, res) => {
    console.log("hello from DELETE", req.params.idParam);
    // res.sendStatus(200);
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1`;

    pool.query(queryText, [req.params.idParam]).then((result)=>{
        console.log("Success! ", result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in delete', error);
        res.sendStatus(500);
    });
});

router.put('/complete/:idParam', (req,res) => {
    console.log('in put request', req.body.completeStatus, req.params.idParam );
    let queryText = `UPDATE "tasks" SET "complete" = true WHERE "id" = $1;`;
  
    pool.query(queryText, [req.params.idParam]).then((result) => {
        console.log('result from put', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in put', error);
        res.sendStatus(500);
    });

});



module.exports = router;