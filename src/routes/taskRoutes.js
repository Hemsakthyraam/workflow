const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {validateTask} = require('../middlewares/validatorTask');
const checkRole = require('../middlewares/roleMiddleware');

router.post('/',
    checkRole(['admin','manager']),
    validateTask, 
    taskController.createTask
);
router.get('/',taskController.getTasks);
router.patch('/:id/status',
    checkRole(['admin', 'manager']),
    taskController.updateTask
);

module.exports = router;