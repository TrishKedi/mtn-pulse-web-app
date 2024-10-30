
// Redeem Freebie or Generate Voucher
const redeemOrGenerateVoucher = (userData, code, source, uuid, pdtCodes, completeRequest) => {
    if (pdtCodes.length === 2) {
        // Call function to get a voucher token
        getVoucherToken((token) => generateVoucher(token, userData.phone, pdtCodes, completeRequest, uuid));
    } else {
        // Call function to redeem a freebie directly
        redeemFreebie(userData.phone, code, completeRequest, uuid);
    }
};


// Execute Freebie or Voucher Flow
export const redeemFreebie = functions.https.onRequest((req, res) => {
    const { id } = req.body;
    const { token, code, source } = req.headers;
    const pdtCodes = code ? code.split(",") : [];

    res.header(headers);

    if (!id) {
        return res.status(400).json({ result: 'failed', error: 'Missing required information' });
    }

    userRef.doc(id).get().then(record => {
        if (!record.exists) {
            return res.status(400).json({ result: 'failed', error: 'Unknown ID' });
        }

        const userData = record.data();
        if (_.get(userData, 'token', '') !== token && source !== 'web') {
            return res.status(400).json({ result: 'failed', error: 'Invalid token' });
        }

        const uuid = `${moment().unix()}${_.random(100, 999)}`;
        
        redeemOrGenerateVoucher(userData, code, source, uuid, pdtCodes, (status, message) => completeRequest(res, status, message));
    }).catch(error => {
        console.log('Error fetching record:', error);
        res.status(400).json({ result: 'failed', error: 'Something went wrong' });
    });
});


