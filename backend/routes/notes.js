const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');

router.get('/', async (req, res) =>{
    await Note.find(function (err, notes) {
        console.log(notes);
        res.json(notes);
    });
    
});

router.get('/:id', async (req, res) =>{
    const note = await Note.findById(req.params.id);
    res.json(note); 
    
});

router.post('/', async (req, res) =>{
    const {titulo,usuario,content,fecha} = req.body;
    const note = new Note({titulo,usuario,content,fecha});
    await note.save();
    res.json({status: 'Nota guardada'});
    
});

router.put('/:id', async (req, res) =>{
    const {titulo,usuario,content,fecha} = req.body;
    const newNote = {titulo,usuario,content,fecha};
    await Note.findByIdAndUpdate(req.params.id,newNote);
    res.json({status: 'Nota actualizada'});
    
});

router.delete('/:id', async (req, res) =>{
    await Note.findByIdAndDelete(req.params.id);
    res.json({status: 'Nota eliminada'});
    
});

module.exports = router;