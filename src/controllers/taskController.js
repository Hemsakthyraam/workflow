const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const { success, error } = require('../utils/response');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    await ActivityLog.create({
      action: 'task_created',
      entityType: 'task',
      entityId: task._id, // ✅ fixed
      performedBy: req.body.assignedTo
    });

    success(res, task);

  } catch (err) {
    error(res, err.message);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const {
      status,
      project,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (project) filter.project = project;

    const tasks = await Task.find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('assignedTo project');

    success(res, tasks);

  } catch (err) {
    error(res, err.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      { status },
      { new: true }
    );

    if (!task) {
      return error(res, 'Task not found');
    }

    await ActivityLog.create({
      action: 'status_changed',
      entityType: 'task',
      entityId: task._id,
      performedBy: task.assignedTo
    });

    success(res, task);

  } catch (err) {
    error(res, err.message);
  }
};
