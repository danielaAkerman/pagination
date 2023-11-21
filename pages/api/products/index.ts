import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"
import { productsIndex } from "lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const results = await productsIndex.search(req.query.search as string)
    res.send(
        results
    )
}