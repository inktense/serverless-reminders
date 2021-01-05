import * as fs from 'fs';
import * as path from 'path';
import ejs from 'ejs';
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

export function sendReminderWeekend() {
   const ses = new SES();

   ses.sendEmail(generateEmailParams(), (err: AWSError, data: SendEmailResponse) => {
       if (err) console.log(err, err.stack);
         else console.log(data);
     });
}