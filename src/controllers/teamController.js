const Team = require('../models/Team');
const { success, error } = require('../utils/response');

exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    success(res, team);
  } catch (err) {
    error(res, err.message);
  }
};

exports.getTeams = async (req, res) => {
  try{
  const teams = await Team.find().populate('members createdBy');
  success(res, teams);
  }
  catch(err){
    error(res, err.message);
  }
};