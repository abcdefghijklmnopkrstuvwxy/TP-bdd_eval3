import { Router } from "express";
import { createProject, getProject, getProjectById, updateProject, delProject, getProjectByStatus } from "../controllers/projectController"

const router = Router();

router.post('/projects', createProject);
router.get('/projects',getProject);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', delProject);
router.put('/projects/:id/complete', getProjectByStatus);

export default router;