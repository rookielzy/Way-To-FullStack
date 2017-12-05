const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()  => {
    console.log('connect success')
    const testSchema = mongoose.Schema({
        name: String
    })
    
    const Test = mongoose.model('TestMongoDB', testSchema)
    
    const test = new Test({ name: 'test' })
    test.save((err, test) => {
        if (err) {
            console.error(err)
        } else {
            console.log('save success')
        }
    })
})
