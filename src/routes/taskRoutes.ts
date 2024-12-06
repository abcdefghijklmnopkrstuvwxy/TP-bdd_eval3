import { Router } from "express";
import { createTask, getTask,  getTaskById, updateTask, delTask, markdoneTask } from "../controllers/taskController"

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks',getTask);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', delTask);
router.put('/tasks/:id/mark-done', markdoneTask);

export default router;