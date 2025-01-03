const express = require('express');
const catchAsync = require('../utils/catchAsync');
const review = require('../Controllers/reviews');
const router = express.Router({mergeParams:true});
const {isLoggedIn,validateReview,RAuthor} = require('../middleware');
router.post('/',isLoggedIn,validateReview,catchAsync(review.createReview));
router.delete('/:reviewId',isLoggedIn,RAuthor,catchAsync(review.deleteReview));
module.exports = router;