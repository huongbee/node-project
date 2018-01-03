const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model('ideas', IdeaSchema)

/*
**
cd /usr/local/bin
mongo
show dbs
use name'sDB
show collections
db.name'sDB.find()

*/