import type { NextApiRequest, NextApiResponse } from "next"

export function getOffsetAndLimitFromReq(req: NextApiRequest, maxLimit, MaxOffset) {
    const queryLimit = parseInt(req.query.limit as string)
    const limit = ((queryLimit < maxLimit) ? queryLimit : 100)

    const queryOffset = parseInt(req.query.offset as string)
    const offset = ((queryOffset < MaxOffset) ? queryOffset : 0)
    return { limit, offset }
}