import type { NextApiRequest, NextApiResponse } from "next"

function getLista() {
    const arr = Array.from(Array(10000).keys()
    )
    return arr.map(valor => { return { nombre: valor } })
}

function getOffsetAndLimitFromReq(req: NextApiRequest, maxLimit, MaxOffset) {
    const queryLimit = parseInt(req.query.limit as string)
    const limit = ((queryLimit < maxLimit) ? queryLimit : 100)

    const queryOffset = parseInt(req.query.offset as string)
    const offset = ((queryOffset < MaxOffset) ? queryOffset : 0)
    return { limit, offset }
}

export default function (req: NextApiRequest, res: NextApiResponse) {
    const lista = getLista()
    const { limit, offset } = getOffsetAndLimitFromReq(req, 100, lista.length)

    const sliced = lista.slice(offset, offset + limit)

    res.send({ results: sliced, pagination: { limit, offset, total: lista.length } })
}