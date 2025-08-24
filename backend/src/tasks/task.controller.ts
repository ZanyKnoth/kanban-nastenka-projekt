import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from "./task.schema";
import { TaskDto } from "./task.dto";

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
}