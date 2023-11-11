import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"
import Airtable from 'airtable';

var base = new Airtable({ apiKey: 'patYc6tJ5GqOv0xIf.201d68350c9ce8792017b4a42e448e141e2bf45bf9339e0c040516f9bdcfceee' }).base('appSOp88YvPqFCF7w');

export default function (req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getOffsetAndLimitFromReq(req, 100, 10000)

    base('Furniture').select({
        fields: ["Name", "Type", "Images", "Unit cost"],
        pageSize: limit
    }).firstPage(function (err, records) {
        if (err) { console.error(err); return; }

        // records.forEach(function(record) {
        //     console.log('Retrieved', record.get('Name'));
        // });

        const results = records.map(r => {
            return {
                id: r.id,
                ...r.fields,
            }
        })
        res.send({
            results,
            pagination: {
                limit,
                offset,
                // total: lista.length 
            }
        })
    });

}