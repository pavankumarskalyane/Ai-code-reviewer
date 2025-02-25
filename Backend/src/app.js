const express = require('express');
const aiRoutes = require('./routes/ai.routes');

const [code, setCode] = useState("");
const [review, setReview] = useState("");

const app = express()
app.use(express.json()); 
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/ai', aiRoutes)
module.exports = app;