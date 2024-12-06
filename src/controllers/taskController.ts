import { Request, Response } from "express";  
import Task from "../models/Tasks";
import { SortOrder } from "mongoose";
import Project from "../models/Projects";


export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId, title, done, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'title is required' });
        }

        // Créer le projet
        const task = new Task({ projectId, title, done, dueDate });
        task.save()
        //exist
        const projectExist = await Project.findById(projectId);
        if(!projectExist){
            return res.status(400).json({
                message: 'projectId not found'
            })
        }

        res.status(201).json({ 
            message: 'Task created successfully', task });
        } catch (error: any) {
            res.status(500).json({ 
                message: 'Error creating Task', error: error.message });
    }
};

export const getTask = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.query;

        const filter: Record<string, any> = {};
        if (projectId) {
            filter.projectId = projectId; 
        }
        const tasks = await Task.find(filter).populate("projectId"); 
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    try{
        const tasks = await Task.findById(req.params.id);
        res.status(200).json(tasks)
    }catch(error: any) {
        res.status(500).json({message : error.message})
    }
}

export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try{
        const updates = req.body
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(id, updates, {new: true});

        if(!Task) {
            return res.status(404).json({message: 'Task not found'})
        }

        res.status(200).json({message: 'Task updated succesfully', task})
    }catch(error: any){
        res.status(500).json({message : error.message})
    }
}

export const delTask = async (req: Request, res: Response): Promise<any> => {
    try{
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id);

        if(!Task) {
            return res.status(404).json({message: 'Task not found'})
        }

        res.status(200).json({message: 'Task deleted succesfully', task})
    }catch(error: any){
        res.status(500).json({message : error.message})
    }
}

export const markdoneTask = async (req: Request, res: Response): Promise<any> => {
try {
    const task = await Task.findByIdAndUpdate(req.params.id, { done: 'true' }, { new: true });
    if (!task) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors du marquage', error});
  }
}