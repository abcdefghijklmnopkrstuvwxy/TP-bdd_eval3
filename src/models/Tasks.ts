import mongoose, { Schema, model, Document, Types } from 'mongoose';
import Project from './Projects';

// Définir une interface
interface ITask extends Document {
  projectId: Schema.Types.ObjectId;
  title: string;
  done: boolean;
  dueDate: Date;
}

// Définir notre schéma
const TaskSchema = new Schema<ITask>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true},
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  dueDate: { type: Date, default: Date.now, required: false },
});

// Créer notre model
const Task = model<ITask>('Task', TaskSchema);

export default Task;