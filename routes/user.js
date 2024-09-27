const express = require("express");
// const {db} = require("../db/connection");
const router = express.Router();
const {User, Show} = require('../models');


router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const data = await User.findByPk(id);
    res.json(data);
})
// , {include: Show})

// router.get('/:id/shows', async(req, res) => {
//     try{
//         const id = req.params.id;
//         const data = await User.findByPk(id);
//         const otherData = await data.getShows();
//         res.json(otherData);

//     } catch {
//         console.error("Error for .get for both id and shows.")
//     }
// })


router.put('/:id/shows/:id', async (req, res) => {
    try {
        const thisId = req.params.id;
        const newerData = req.body;
        await Restaurant.update(newerData, {where: {id : thisId} });
        const data = await User.findByPk(thisId);
        res.json(data);
    } catch {
        console.error("This is an error for user .put");
    }
})

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