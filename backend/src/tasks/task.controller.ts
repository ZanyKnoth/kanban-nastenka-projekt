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

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task | null> {
    const task: Task | null = await this.taskService.findById(id);

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return task;
  }

  @Post()
  async create(@Body() taskDto: TaskDto) {
    const { title, content, state } = taskDto;

    return this.taskService.create(title, content);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() taskDto: TaskDto) {
    const task: Task | null = await this.taskService.updateTask(id, taskDto);

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return task;
  }
}