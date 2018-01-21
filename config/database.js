if (process.env.NODE_ENV === 'production') {

    //bd on mlab
    module.exports = {
        mongoURI: 'mongodb://huong:huong123456@ds245287.mlab.com:45287/first-project'
    }
} else {
    //db local
    module.exports = {
        mongoURI: 'mongodb://localhost/project'
    }
}

/*
*/

/*
**

---LOCAL---
cd /usr/local/bin
mongo
show dbs
use name'sDB
show collections
db.name'sDB.find()


---IMPORT---
mongoimport --db dbname --collection tbname --jsonArray --file demo.json 
*/
