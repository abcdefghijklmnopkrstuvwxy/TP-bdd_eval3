import { Request, Response } from "express";
import Project from "../models/Projects";
import User from "../models/Tasks";
import { SortOrder } from "mongoose";

export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, status, createdAt } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Créer le projet
        const project = new Project({ name, description, status, createdAt });
        await project.save();

        res.status(201).json({ 
            message: 'Project created successfully', project });
        } catch (error: any) {
            res.status(500).json({ 
                message: 'Error creating project', error: error.message });
    }
};


export const getProject = async (req: Request, res: Response) => {
    try {
        const Projects = await Project.find();
        res.status(200).json(Projects)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const Projects = await Project.findById(req.params.id);
        res.status(200).json(Projects)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = req.body
        const { id } = req.params
        const project = await Project.findByIdAndUpdate(id, updates, { new: true });

        if (!Project) {
            return res.status(404).json({ message: 'Project not found' })
        }

        res.status(200).json({ message: 'Project updated succesfully', project })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}


/*
cette fonction nous permet de supprimer un project (on a besoin de l'id)
on va ensuite attendre de bien trouver le projet et le supprimer selon l'id
si le project n'existe pas, on renvoie l'erreur 404 : 'project not found'
sinon le message : 'Project delete succesfully' et le project supprimé s'afffiche

si il y a d'autre erreur, le message de l'erreur s'affichera
*/
export const delProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndDelete(id);

        if (!Project) {
            return res.status(404).json({ message: 'Project not found' })
        }

        res.status(200).json({ message: 'Project delete succesfully', project })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}


export const getProjectByStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
      } catch (error) {
        res.status(500).json({message: 'Erreur lors du marquage', error});
      }
}
