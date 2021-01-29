/**
 * @jest-environnent node
 */
import User from '@models/User'
import mongoose from 'mongoose'
import Bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'
import config from '@config'
import { string } from 'yup'

describe('The User model',()=>{
    const user = {
        name: 'Test User',  

        email: 'tests@user.com',

        password: 'password'
    }

    let createUser

    beforeAll(async() => {
        await mongoose.connect('mongodb://localhost:27017/auth-app_test', { useNewUrlParser: true ,useUnifiedTopology: true })

         createUser = await User.create(user)

    })
    it('should hash the user password before saving to the database ',async() =>{
 
        
   
        expect(Bcrypt.compareSync(user.password, createUser.password)).toBe(true)
         

    });

    it('should set the email confirm code for the user before saving to the database', async() =>{
 
        

    expect(createUser.emailConfirmCode).toEqual(expect.any(String))
         

    });

    describe('The generateToken method', () =>{

        it('Should generate a valid jwt for a user', () =>{

        
            const token =  createUser.generateToken()

            const {id} = jwt.verify(token,config.jwtSecret)

            expect(id).toEqual(JSON.parse(JSON.stringify(createUser._id)))

            //console.log(typeof createUser._id)
           // expect(id).toEqual(createUser._id)
        })
    })

    afterAll(async ( ) => {
        await mongoose.connection.close()
    })
}); 