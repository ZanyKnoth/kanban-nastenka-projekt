import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { TaskDto } from "./task.dto";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async create(title: string, content: string): Promise<Task> {
    const task = new this.taskModel({
      title,
      content,
      state: "todo"
    });
    return task.save();
  }
}