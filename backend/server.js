const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connect success");
})



app.use('/servicio/api_notes_app/notes',require('./routes/notes'));
app.use('/servicio/api_notes_app/users',require('./routes/users'));

app.listen(port, () => {
   console.log(`Server is running in port ${port}`);
})