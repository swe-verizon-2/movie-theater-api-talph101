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

router.get('/:id/shows', async(req, res) => {
    try{
        const id = req.params.id;
        const data = await User.findByPk(id);
        const otherData = await data.getShows();
        res.json(otherData);

    } catch {
        console.error("Error for .get for both id and shows.");
    }
})

//
router.put('/:userId/shows/:showId', async (req, res) => {
    try {
        const { userId, showId } = req.params;
        const user = await User.findByPk(userId);      
        const show = await Show.findByPk(showId);
        await User.update({ watchedShowId: showId }, {where: {id: userId}});
        const updatedUser = await User.findByPk(userId, { include: [Show] });
        res.json(updatedUser);
    } catch {
        console.error("This is an error for user .put");
    }
})

module.exports = router;