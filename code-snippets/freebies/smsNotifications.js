// Complete Request Function
const completeRequest = (res, status, message) => {
    res.status(status === 'successful' ? 200 : 400).json({ result: status, ...(status === 'failed' ? { error: message } : { message }) });
};

// Send SMS Function (using sensitive placeholders)
const sendSMS = (phone, message, uuid) => {
    rp({
        url: `${SMS.MADAPI_SERVER}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'SMS_API_KEY_PLACEHOLDER',
            'transactionId': uuid
        },
        body: {
            to: `+256${phone}`,
            from: 'SMS_SENDER_ID_PLACEHOLDER',
            body: message
        },
        json: true
    }).catch(error => {
        console.log('Error sending SMS:', error);
    });
};
