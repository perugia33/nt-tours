const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router
    .route('/top-3-tours')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createNewTour);

router
    .route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
