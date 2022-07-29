const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/crud', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 20
}).then(() => {
    console.log('DB connection established to Database');
}).catch(error => {
    console.error('Could not establish mongoose connection', error);
})
