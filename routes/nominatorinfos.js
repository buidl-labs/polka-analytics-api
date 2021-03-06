const router = require('express').Router();
const Nominator = require('../models/NominatorInfo');

router.get('/nominatorinfo/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Nominator.find({ nominatorId: id });
    const currentNominator = result[0];

    const tempObj = {
      nominatorId: currentNominator.nominatorId,
      validators: currentNominator.validators.map(validator => {
        return {
          validator: validator.validator.electedInfo,
          staked: validator.staked
        };
      }),
      totalStaked: currentNominator.totalStaked,
      highestStaked: currentNominator.highestStaked,
      othersStaked: currentNominator.othersStaked,
      expectedDailyRoi: currentNominator.expectedDailyRoi,
      backers: currentNominator.backers
    };

    res.json(tempObj);
  } catch (err) {
    res.status(400).send({ err: 'Error Bro', err: err });
  }
});

module.exports = router;
