import { app } from './bootstrap';
import { Response, SuperTestStatic } from "supertest";
const request: SuperTestStatic = require('supertest');

describe('TaskController (e2e)', (): void => {
  let createdTaskId: string;

  it('should return all existing tasks', async (): Promise<void> => {
    const res: Response = await request(app.getHttpServer())
        .get('/tasks')
        .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should create a task', async (): Promise<void> => {
    const res: Response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'test', content: 'test' })
        .expect(201);

    createdTaskId = res.body._id;
    expect(res.body.title).toBe('test');
  });
});