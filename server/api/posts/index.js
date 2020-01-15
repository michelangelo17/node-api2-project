const db = require('../../../data/db')
const router = require('express').Router()

module.exports = router

router.get('/', (req, res) =>
  db
    .find()
    .then(postsArray => res.status(200).json(postsArray))
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    )
)

router.get('/:id', (req, res) =>
  db
    .findById(req.params.id)
    .then(post =>
      post[0]
        ? res.status(200).json(post[0])
        : res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    )
)

router.post('/', (req, res) => {
  req.body.title && req.body.contents
    ? db
        .insert(req.body)
        .then(newPostId =>
          db
            .findById(newPostId.id)
            .then(newPost => res.status(201).json(newPost[0]))
        )
        .catch(() =>
          res.status(500).json({
            error: 'There was an error while saving the post to the database.',
          })
        )
    : res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      })
})

router.delete('/:id', (req, res) =>
  db
    .remove(req.params.id)
    .then(removed =>
      removed
        ? res.status(200).json()
        : res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(() =>
      res.status(500).json({
        error: 'The post could not be removed',
      })
    )
)

router.put('/:id', (req, res) => {
  req.body.title && req.body.contents
    ? db
        .update(req.params.id, req.body)
        .then(updated =>
          updated
            ? db
                .findById(req.params.id)
                .then(updatedPost => res.status(200).json(updatedPost[0]))
            : res.status(404).json({
                message: 'The post with the specified ID does not exist.',
              })
        )
        .catch(() =>
          res.status(500).json({
            error: 'The post information could not be modified.',
          })
        )
    : res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      })
})

router.get('/:id/comments', (req, res) =>
  db
    .findPostComments(req.params.id)
    .then(commentsArray => res.status(200).json(commentsArray))
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    )
)

router.post('/:id/comments', (req, res) => {
  req.body.text
    ? db
        .insertComment({ ...req.body, post_id: req.params.id })
        .then(commentId => {
          console.log(commentId)
          commentId
            ? db
                .findCommentById(commentId.id)
                .then(comment => res.status(201).json(comment))
            : res.status(404).json({
                message: 'The post with the specified ID does not exist.',
              })
        })
        .catch(() =>
          res.status(500).json({
            error:
              'There was an error while saving the comment to the database',
          })
        )
    : res
        .status(400)
        .json({ errorMessage: 'Please provide text for the comment.' })
})
