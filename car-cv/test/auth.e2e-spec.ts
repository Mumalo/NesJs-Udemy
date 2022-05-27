import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('Authentication system (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', () => {
        const email = 'testUser@gmail.com'
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({email, password: 'password'})
            .expect(201)
            .then(response => {
                const {id, email} = response.body
                expect(id).toBeDefined()
                expect(email).toEqual(email)
            })
    });

    it('signup as new user then get the currently logged in user', async () => {
        /*
          The superAgent library does not give access to cookies
          To get access to the cookie, we need to get it from the response
          We need to store the cookie and use it in the subsequent requests in the test file
         */
        const email = 'testUser@gmail.com';
        const response = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({email, password: 'password'})
            .expect(201);

        const cookie = response.get('Set-Cookie');
        const {body} = await request(app.getHttpServer())
            .get('/auth/me')
            .set('Cookie', cookie)
            .expect(200)
        expect(body.email).toEqual(email)
    });
});
