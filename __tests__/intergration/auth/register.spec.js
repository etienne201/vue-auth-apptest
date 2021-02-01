/**
 * @jest-environment node
 */
 
 
 import User from '../../../server/models'
 import server from '@server/app'
 //import {connect, disconnect} from '@tests/utils/mongoose'

 import  supertest from 'supertest'
 //import { disconnect } from '@tests/utils/mongoose'

 

 
 const app = ()=> supertest(server)


 describe('The registe process', () => {

    
       beforeEach(async()=>{ 

         await User.deleteMany({})

      })

    it('should register a new user',async()=> {
        const response = await  app().post('/api/v1/aurh/register').send({
          
            name: 'Test User',

            email: 'test@user.com',

            password: 'password'
        })


        console.log(response.body)
        //  expect(response.status).toBel(200)

        //  expect (response.body.message).toBe('Account registered.')

        //  expect(response.body.data.token).toBeDefined()
    })

     afterAll(async() => {
        await disconnect()
     })

 })