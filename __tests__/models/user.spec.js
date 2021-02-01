/**
 * @jest-environnent node
 */
import User from '@models/User'
import {connect, disconnect} from '@tests/utils/mongoose'
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config'
 

describe('The User model',()=>{
    const user = {
        name: 'Test User',  

        email: 'joeemakogmail',

        password: 'password'
    }

    let createUser

    beforeAll(async() => {
        await  connect()

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
        await disconnect()
    })
}); 