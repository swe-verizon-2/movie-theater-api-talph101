const express = require("express");
// const {db} = require("../db/connection");
const {Show} = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const data = await Show.findByPk(id);
    res.json(data);
})

router.get('/:id/users', async(req, res) => {
    try{
        const id = req.params.id;
        const data = await Show.findByPk(id);
        const otherData = await data.getUsers();
        res.json(data);

    } catch {
        console.error("This is show .get error for getting users");
    }
})


// router.put('/show/:id/:available', async (req, res) => {
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

