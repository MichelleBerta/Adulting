const router = require('express').Router();
const User = require('../../models/User');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const { Activities } = require('../../models');
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
  // find all products
  try {
    const allUserData = await User.findAll({    });
    res.status(200).json(allUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  //find 1 product
  try {
    const allUserData = await User.findOne(req.params.id, {
      include: [{ model: Activities }]
    });

    if (!allUserData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }

    res.status(200).json(allUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  //find 1 product
  try {
    const allUserData = await User.findOne(req.params.id);

    if (!allUserData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }

    res.status(200).json(allColorData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { activities: req.body } },
    // "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id/:activityId', async (req, res) => {
  const response = await User.findOne({ "_id" : req.params.id});
  const act = await response.activities.map((a) => {
    console.log(String(a._id) === req.params.activityId)
    if (String(a._id) === req.params.activityId) {
      a.completed = req.body.completed;
      return a;
    } else {
      return a;
    }
  });
  const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {
    $set:{ activities:act }
  })
  res.json(updatedUser)
});

router.get('/:id/points', (req, res) =>{
  User.aggregate([
    { $match : { _id : mongoose.Types.ObjectId(req.params.id) } },
    {
        $addFields: {
            totalPoints: {
                $sum: '$activities.points',
            },
        },
    },
  ])
    .then((dbWorkouts) => {
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err);
    });
})


router.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    try {
      console.log(user);
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.loggedIn = true;

        res.json({ user: user, message: 'You are now logged in!' });
      });

    } catch (err) {
      res.status(400).json(err);
    }
  })(req, res, next)
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;