import supertest from 'supertest';  
import app from '../server';  
describe("endpoint", () => { 
    let token = "";
    beforeAll( (done) => {
        let user = { 
            name: "test",
            email:"test@gmail.com",
            password:"test123"
        } 
        supertest(app).post('/auth/login').send({email: user.email, password: user.password}).then((response: any)=>{
        if(response.status==200){
            token = "Bearer " + response.body.token; 
            app.request.headers.authorization = token;
            done()
        }else{
            supertest(app).post('/auth/register').send(user).then((response: any)=>{
                token = "Bearer " + response.body.token;
                done() 
            }, (error: any)=>{
                done(error)
            })
        }   
      }, (error: any)=>{
        done(error)
      })
    });

     
    describe("GET certificate/availabe", ()=>{  
        it('Should return certificates', async () => {  
           const response = await supertest(app).get('/certificate/available').set("Authorization", token).expect(200);  
           expect(response.body.length).toBeGreaterThan(0)
           expect(response.body[0].status).toBe("available")
           })
     }) 

     describe("GET certificate/user", ()=>{  
        it('Should return owner certificates', async () => {  
           const response = await supertest(app).get('/certificate/user').set("Authorization", token).expect(200);  
           expect(response.body.length).toBe(0)
           })
     }) 
});

 
 
