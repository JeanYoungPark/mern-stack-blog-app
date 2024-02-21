const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://root:1234@cluster0.82xde05.mongodb.net/').then(() => console.log('Connected mongo db')).catch((e) => console.log(e));