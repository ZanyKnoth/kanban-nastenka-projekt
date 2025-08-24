import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ collection: 'tasks', timestamps: true })
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    content: string;

    @Prop({ required: true, default: "todo" })
    state: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);