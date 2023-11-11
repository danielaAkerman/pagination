import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"

export default function (req: NextApiRequest, res: NextApiResponse) {

    const { limit, offset } = getOffsetAndLimitFromReq(req, 100, 10000)

    const lista = [1, 2, 3, 4, 5] //mock

    const sliced = lista.slice(offset, offset + limit)

    res.send({ results: sliced, pagination: { limit, offset, total: 10000 } })
}