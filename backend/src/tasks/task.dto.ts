import { IsString, IsIn, IsOptional } from 'class-validator';

export class TaskDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    @IsIn(["todo", "in-progress", "done"])
    state?: string;
}