const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) =>{
    await User.find(function (err, users) {
        console.log(users);
        res.json(users);
    });
    
});

router.get('/:id', async (req, res) =>{
    const user = await User.findById(req.params.id);
    res.json(user); 
    
});

router.post('/', async (req, res) =>{
    const {nombre} = req.body;
    const user = new User({nombre});
    await user.save();
    res.json({status: 'Usuario Guardado'});
    
});

router.put('/:id', async (req, res) =>{
    const {nombre} = req.body;
    const newUser = {nombre};
    await User.findByIdAndUpdate(req.params.id,newUser);
    res.json({status: 'Usuario Actualizado'});
    
});

router.delete('/:id', async (req, res) =>{
    await User.findByIdAndDelete(req.params.id);
    res.json({status: 'Usuario Eliminado'});
    
});

module.exports = router;