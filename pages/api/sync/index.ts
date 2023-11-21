import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"
import { productsIndex } from "lib/algolia"
import { airtableBase } from "lib/airtable"

export default function (req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getOffsetAndLimitFromReq(req, 100, 10000)

    airtableBase('Furniture').select({
        fields: ["Name", "Type", "Images", "Unit cost"],
        pageSize: 5
    }).eachPage(async function (records, fetchNextPage) {
        const objects = records.map(r => {
            return {
                objectID: r.id,
                ...r.fields
            }
        })
        await productsIndex.saveObjects(objects)
        console.log("siguiente pag")
        fetchNextPage()
    }, function done(err) {
        if (err) { console.error(err); return; }
        console.log("terminó")
        res.send("ok")
    });

}