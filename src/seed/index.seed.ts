import { faker } from '@faker-js/faker';
import User from '../models/User'; 
import Certificate from '../models/Certificate';
import sequelize from '../utils/db-connection';
function createRandomCertificate() {
  return {
    country: faker.address.country()
  };
}

function createRandomUser() {
    return { 
      name: faker.name.fullName(),
      email: faker.internet.email(), 
      password: faker.internet.password(), 
    };
}

export async function runSeed(){
    // check if data exist
    await User.sync();
    await Certificate.sync();
    const users = await User.findAll({});
    if(users.length==0){
        Array.from({ length: 5 }).forEach( async () => {
            await User.create(createRandomUser());
        });
        Array.from({ length: 5 }).forEach(async () => { 
            User.create(createRandomUser()).then( async (user)=>{
                await Certificate.create({ ...createRandomCertificate(), status: "owned", owner: user.get("id")}); 
            }) 
        });     
        Array.from({ length: 95 }).forEach( async () => { 
            await Certificate.create({ ...createRandomCertificate(), status: "available" });
        });

    }
}



