/**
 * @jest-environment node
 */
 
 
 import User from '../../../server/models/User'
 import server from '@server/app'
 import  supertest from 'supertest'
 import { disconnect } from '@tests/utils/mongoose'

 

 
 const app = ()=> supertest(server)

 const REGISTER_ENDPOINT = '/api/v1/auth/register'
 let user = {
          
    name: 'Test User',

    email: 'test@user.com',

    password: 'password' 
}


 describe('The registe process', () => {

    
       beforeEach(async()=>{ 

        await User.deleteMany({})

      })

    it('should register a new user',async()=> {
        const response = await  app().post(REGISTER_ENDPOINT).send(user)
       
        
           expect(response.status).toBe(200)

        expect (response.body.message).toBe('Account registered.')

        expect(response.body.data.token).toBeDefined()
    })

    // it('Should return a 422 if registration fail ' , async () => {

    //     // prepare

    //     const user  = await User.create(user)


    //     // action



    //     const response = await app().post(REGISTER_ENDPOINT).send(user)

    //     // assertion

    //     //expect(response.status).toBe(422)

    //     expect(response.body.message).toBe('Validation failed.')

    //     expect(response.body.data.errors).toEqual({
    //         email: 'This email has already been taken.'
    //     })


    //})
 
      afterAll(async() => {
         await disconnect()
      })

 })