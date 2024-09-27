const express = require("express");
// const {db} = require("../db/connection");
const {Show} = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
    const shows = await Show.findAll();
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const data = await Show.findByPk(id);
    res.json(data);
})

// app.get('/show:id/users', async(req, res) => {
//     const id = req.params.id;
//     const data = await Show.findByPk(id);
//     res.json(data);
// })


// app.put('/show/:id/:available', async (req, res) => {
//     try {
//         const thisId = req.params.id;
//         const newerData = req.body;
//         await Restaurant.update(newerData, {where: {id : thisId} });
//         const data = await Show.findByPk(thisId);
//         res.json(data);
//     } catch {
//         console.error("This is an error for show .put");
//     }
// })

router.delete('/:id', async (req, res) => {    
    try{
        const data = await Show.findByPk(req.params.id);
        data.destroy()
        res.json(data);
        
    } catch {
        console.error("This is an error for user .delete.")
    }
});


module.exports = router;

