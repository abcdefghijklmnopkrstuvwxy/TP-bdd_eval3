import { Schema, model, Document } from "mongoose";

// Définir une interface
interface IProject extends Document {
    name: string;
    description: string;
    status: String;
    createdAt: Date;
}

// Définir notre schéma
//type ProjectStatus = 'planned' | 'in-progress' | 'completed';

const ProjectSchema = new Schema<IProject>({
    name: {type: String, required: true},
    description : {type: String,required: false},
    status: {type: String, default: 'planned'},
    createdAt: {type: Date, default: Date.now}
})

// Créer notre model
const Project = model<IProject>('Project', ProjectSchema);

export default Project