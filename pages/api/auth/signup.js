import connectMongo from '@/db/mongo_conn'
import Users from '@/models/Schema'
import { hash } from 'bcryptjs'

export default async function handler(req,res) {

    connectMongo().catch(error => res.status(403).json({error: 'mongodb connect fail ' + error.message }))

    //return res.status(200).json({status: true,message: 'db connect ok'})

    if(req.method === 'POST'){
        if(!req.body) return res.status(404).json({error: 'Don\'t have form data'})

        const {username, email, password} = req.body

        // check duplicate user
        const isExistUser = await Users.findOne({email})
        if(isExistUser) return res.status(422).json({error: 'User already exists'})

        // add user to db
        Users.create({username,email,password: await hash(password, 12)})
            .then((data) => res.status(200).json({status: true, user: data}) )
            .catch((error) => res.status(404).json({error: error.message}))
    } else {
        res.status(500).json({error: 'Http Method invalid, only POST accepted'})
    }

    

}