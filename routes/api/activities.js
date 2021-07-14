
const router = require('express').Router();
const Activities = require('../../models/Activities');
const activitiesController = require('../../controllers/activitiesController');

// Matches with "/api/activities"
router.route("/")
  .get(activitiesController.findAll)
  .post(activitiesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(activitiesController.findById)
  .put(activitiesController.update)
  .delete(activitiesController.remove);

module.exports = router;
















