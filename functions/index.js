const functions = require('firebase-functions');
const cors = require('cors');
const admin = require('firebase-admin');
const corsOptions = {
    origin: 'https://teacherlaneantunes.com.br',
    optionsSuccessStatus: 200
}
const emailjs = require('emailjs-com');
const axios = require('axios');
const corsMiddleware = cors(corsOptions);
admin.initializeApp();

//Funtion 1 - MAILCHIMP SUBSCRIPTION//

exports.addUserToMailchimp = functions.https.onRequest((req, res) => {
    corsMiddleware(req, res, async () => {
        const mailchimpKey = functions.config().mailchimp.key;
        const mailchimpServer = functions.config().mailchimp.server;
        const mailchimpListId = functions.config().mailchimp.list_id;
        const { name, email } = req.body;

        const data = {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name,
            }
        };

        try {
            const response = await axios({
                method: "post",
                url: `https://${mailchimpServer}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/`,
                data: data,

                headers: {
                    Authorization: `apikey ${mailchimpKey}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                res.send({ success: true });
            } else {
                throw new Error('Failed to subscribe user');
            }
        } catch (error) {
            console.error(error);  // Log the error
            res.status(500).send({ error: 'Failed to subscribe user' });
        }
    });
});

//Function 2 - DELETE DATA FROM USERS ON DATABASE//
exports.deleteUserData = functions.auth.user().onDelete(async (user) => {
    // user.uid will give you the uid of the deleted user
    const uid = user.uid;

    // Reference to the user's data
    const doc = admin.firestore().collection(uid);

    // Delete the user's collection
    return doc.get().then(snapshot => {
        const batch = admin.firestore().batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        return batch.commit();
    });
});

//FUNCTION 3 - CONTACT PAGE - EMAIL JS


exports.sendEmail = functions.https.onRequest(async (req, res) => {
    // Apply the CORS middleware to the request and response
    corsMiddleware(req, res, async () => {
        // Set CORS headers to allow requests from the specified origin
        res.set('Access-Control-Allow-Origin', 'https://teacherlaneantunes.com.br');
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');

        // Check if the request is an HTTP OPTIONS preflight request
        if (req.method === 'OPTIONS') {
            return res.status(204).send('');
        }

        const { to, subject, text } = req.body;

        // Access configuration values
        const emailjsConfig = functions.config().emailjs;

        // Create an email client
        const client = emailjs.server.connect({
            user: emailjsConfig.user_id,
            service_id: emailjsConfig.service_id,
            template_id: emailjsConfig.template_id,
        });

        // Send the email
        try {
            await client.send({
                to,
                subject,
                text,
            });

            return res.status(200).send('Email sent successfully.');
        } catch (error) {
            console.log("tried but failed");
            return res.status(500).send('Error sending email: ' + error);
        }
    });
});
