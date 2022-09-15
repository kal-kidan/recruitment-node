import request from 'supertest';  
import app from '../server';
import User from '../models/User';
import sequelize from '../utils/db-connection'  
beforeEach( async () => {
     await sequelize.sync();
     const user = await User.findOne({ where: {email:"test@gmail.com"} });
     if(user){
          await user.destroy();
     }
})
describe("POST TO /auth/register", ()=>{ 
       it('Should register', async () => {
          const response = await request(app).post('/auth/register')
                         .send({
                              name: 'test name',
                              email:"test@gmail.com",
                              password:"test123"
                         }).expect(201);  
          const user: any = await User.findOne({ where: {email: response.body.email}, raw: true});
          expect(user.email).toEqual(response.body.email)
          })
})

describe("POST /auth/login", ()=>{   
    it('should return unauthorize', async () => {
        await request(app).post('/auth/login')
             .send({ 
                  email:"test@gmail.com",
                  password:"124"
        }).expect(401);  
    }) 
    it('should return 200', async () => {
        let user = { 
            email:"test@gmail.com",
            password:"test123"
        }
        await request(app).post('/auth/register')
                         .send({name: 'test name', ...user}).expect(201);  
        await request(app).post('/auth/login').send(user).expect(200);  
    }) 
    
})
