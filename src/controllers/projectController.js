const Project =require('../models/Project');
const { success, error } = require('../utils/response');

exports.createProject = async(req,res) => {
    try{
        const projects = await Project.create(req.body);
        success(res, projects);
    }
    catch(err){
        error(res,err.message);
    }
};

exports.getProject = async(req,res) => {
    const projects = await Project.find().populate('team createdBy');
    success(res, projects);
};
