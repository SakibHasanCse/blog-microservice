const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res) => {
    return res.json( commentsByPostId[req.params.id] || [] );
});

app.post('/posts/:id/comments', (req, res) => {
    const commentsId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    console.log(comments)
    comments.push({id: commentsId ,content: content});
    console.log(comments)

    commentsByPostId[req.params.id] =comments

    

    return res.status(201).json(comments)

});

app.listen(4001, () => {
    console.log('Comment server listening on port 4001!');
});