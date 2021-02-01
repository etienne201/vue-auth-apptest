/**
 * @jest-environnent node
 */
import User from '@models/User'
 import {connect, disconnect} from '@tests/utils/mongoose'
import Response from '@tests/utils/response'

// import Bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import config from '@config'
import authMidleware from '@middleware/auth'
//import Response from '@tests/utils/response'
 


 

describe('The auth middleware model',()=>{
    const user = {
        name: 'Test User',  

        email: 'tests@user.com',

        password: 'password'
    }

    let createUser

    beforeAll(async() => {
        await connect()

         createUser = await User.create(user)

    })
     
    it('should call the next function if authentication in successful', async () =>{
        const access_token  = createUser.generateToken()

        const req = {
            body: {
                access_token
            }
        }

        const res = new Response()

        const next =jest.fn()

        await authMidleware(req,res, next)


        expect(next).toHaveBeenCalled()
    })

    it('should return a 401 if authentication fail', async () =>{

        const req = {
            body: {

            }
        }

        const res = new Response()

        const statusSpy = jest.spyOn(res, 'status')

        const jsonSpy = jest.spyOn(res, 'json')

        const next = jest.fn()
        await authMidleware(req,res, next)

        expect(next).toHaveBeenCalledTimes(0)

        expect(statusSpy).toHaveBeenCalledWith(401)

        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Unauthenticated.'
        })
    })

    afterAll(async ( ) => {
        await disconnect()
    })
}); 