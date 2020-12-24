 import * as fs from 'fs';
 import * as path from 'path';
 import { SES, AWSError } from 'aws-sdk';
 import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';


 function generateEmailParams(): SendEmailRequest {
    const emailHtml = fs.readFileSync(path.resolve(__dirname, '../templates/dailyReminder.html'), 'utf-8');
    const emailAddress: string | undefined = process.env.emailAddress;

    if(emailAddress === undefined) {
        throw new Error('Email address is undefined')
    }

    return {
        Source: emailAddress,
        Destination: {
            ToAddresses: [
                emailAddress
            ]
        },
        Message: {
            Subject: {
                Data: 'Test email',
                Charset: "UTF-8"
            },
            Body: {
                Text: {
                    Data: 'text?',
                    Charset: "UTF-8"
                },
                Html: {
                    Data: emailHtml,
                    Charset: "UTF-8"
                }
            }
        }
    }
 }

 export function sendReminderDaily() {
    const ses = new SES();

    ses.sendEmail(generateEmailParams(), (err: AWSError, data: SendEmailResponse) => {
        if (err) console.log(err, err.stack);
          else console.log(data);
      });
 }
 
 
 









// const AWS = require('aws-sdk');
// import * as fs from 'fs';
// import * as path from 'path';
// //import html from '../templates/dailyReminder.html';
// console.log('emailAddress', emailAddress)



// export const sendReminderDaily = (callback) => {
//     console.log("I'm in here")
   
//     AWS.config.update({region:'eu-west-2'});
//     const ses = new AWS.SES();

//     const emailHtml = fs.readFileSync(path.resolve(__dirname, '../templates/dailyReminder.html'), 'utf-8');
// console.log("email: ", emailAddress, "dsds")
//     const toAndFromAdress = ''
//     const params = {
//         Destination: {
//             ToAddresses: [emailAddress]
//         },
//         Message: {
//             Body: {
//                 Html: {
//                     Charset: "UTF-8", 
//                     Data: emailHtml
//                 }, 
//                 Text: {
//                     Charset: "UTF-8", 
//                     Data: "Remember to continue helping the Woof Garden in your Pluralsight course!"
//                 }
//             }, 
//             Subject: {
//                 Charset: "UTF-8", 
//                 Data: "Woof Garden Reminder"
//             }
//         },
//         ReplyToAddresses: [emailAddress],
//         Source: toAndFromAdress, 
//     };

//     ses.sendEmail(params, function(err, data) {
//         // an error occurred
//         if (err) console.log(err, err.stack); 
//         // successful response
//         else callback(null, data);
//     }); 
// };