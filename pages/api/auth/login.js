import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken'
import {error} from "next/dist/build/output/log";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const query = `query Login($email: String) {
        user(where: {email: {_eq: $email}}) {
            id
            email
            password
            displayName
        }}`

        const userRecord = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': `n;%5;~WQ%fw2Eq=,"k>bE6}>8FB!27<dRBXh%dMn`
            },
            body: JSON.stringify({
                'query': query,
                'variables': {'email': req.body.email}
            })
        })

        if (userRecord.data) {
            const currentUser = userRecord.data.user[0]
            const correctPassword = await argon2.verify(currentUser.password, req.body.password)

            if (correctPassword) {
                // Password hashes match
                const data =  {
                    id: currentUser.id,
                    name: currentUser.displayName,
                    email: currentUser.email
                }

                const signature = process.env.AUTH_SECRET
                const expiration = '6h'

                const authToken = jwt.sign({ data }, signature, { expiresIn: expiration })
                const refreshToken = jwt.sign({ id: currentUser.id }, signature, { expiresIn: '60d' })

                res.send({
                    token: authToken,
                    refreshToken: refreshToken})

            } else {
                console.log("incorrect password!")
                res.status(401).end();
            }

        } else {
            const hash = await argon2.hash(req.body.password)
            console.log("no account found" + hash)
            res.status(401).end();
        }


    } else {
        // Handle any other HTTP method
        res.redirect('/login')
    }
}