import methods from "micro-method-router"
import type { NextApiRequest, NextApiResponse } from "next"

export default methods({
    post(req: NextApiRequest, res: NextApiResponse) {
        const user = {
            email: "",
            id: "",
            cart: ["ñsdjfn", "skdjf"]
        }

        const cart = user.cart
        cart.push(req.body.product_id)

        // user.update({
        //     cart:{}
        // })
        res.send(user)
    }
})