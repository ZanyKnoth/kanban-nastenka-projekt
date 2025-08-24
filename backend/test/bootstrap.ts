import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export let app: INestApplication;

let mongod: MongoMemoryServer;

beforeAll(async (): Promise<void> => {
    mongod = await MongoMemoryServer.create();
    const uri: string = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot(uri),
            AppModule,
        ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
});

afterAll(async (): Promise<void> => {
    if (app) await app.close();
    if (mongod) await mongod.stop();
    await mongoose.connection.close();
});