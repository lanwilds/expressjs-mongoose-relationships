const express = require('express');
const router = express();

//Controllers
const UserController = require('../controllers/UserController');
const AuthorController = require('../controllers/AuthorController');
const PostController = require('../controllers/PostController');
const EbookController = require('../controllers/EbookController');

router.route('/')
    .get(UserController.index);
router.route('/users')
	.get(UserController.index)
	.post(UserController.store);
router.route('/user/:id')
	.get(UserController.show)
	.put(UserController.update)
	.delete(UserController.delete);

// Authors Routes
router.route('/authors')
	.get(AuthorController.index)
	.post(AuthorController.store);
router.route('/author/:id')
	.get(AuthorController.show)
	.put(AuthorController.update)
	.delete(AuthorController.delete);

// Posts Routes
router.route('/posts')
	.get(PostController.index)
	.post(PostController.store);
router.route('/author/:id')
	.get(PostController.show)
	.put(PostController.update)
	.delete(PostController.delete);

// Ebook Routes
router.route('/ebooks')
	.get(EbookController.index)
	.post(EbookController.store);
router.route('/ebook/:id')
	.get(EbookController.show)
	.put(EbookController.update)
	.delete(EbookController.delete);

module.exports = router;