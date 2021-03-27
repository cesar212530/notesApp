const mongoose = require('mongoose');

const { Schema } = mongoose;


const NoteSchema = new Schema({
    titulo: {type: String, required: true},
    usuario: {type: String, required: false},
    content: {type: String, required: true},
    fecha: {type: String, required: true}
});

module.exports = mongoose.model('Note', NoteSchema);