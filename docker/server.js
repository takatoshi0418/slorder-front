const express = require('express')
const app = express()

app.use('/img', express.static(__dirname + '/img/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/js', express.static(__dirname + '/js/'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(80, () => console.log('Example app listening on port 80!'))