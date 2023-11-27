import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"
import { productsIndex } from "lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { offset, limit } = getOffsetAndLimitFromReq(req)


    const results = await productsIndex.search(req.query.search as string, {
        hitsPerPage: limit,
        page: offset > 1 ? Math.floor(offset / limit) : 0
    })
    res.send({
        results: results.hits,
        pagination: {
            offset,
            limit,
            total: results.nbHits
        }
    })
}