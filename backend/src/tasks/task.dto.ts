import { IsString, IsIn, IsOptional, IsNotEmpty, Matches } from 'class-validator';

export class TaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @Matches(/\S/, { message: 'Title cannot be only whitespace' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Content cannot be empty' })
    @Matches(/\S/, { message: 'Content cannot be only whitespace' })
    content: string;

    @IsString()
    @IsOptional()
    @IsIn(["todo", "in-progress", "done"])
    state?: string;
}