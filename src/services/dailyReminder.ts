 import * as path from 'path';
 import axios from "axios";
 import ejs from 'ejs';
 import { SES, AWSError } from 'aws-sdk';
 import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
 import { APODDto } from '../common/interfaces/APOD';
 import * as css from '../resources/css/template.css';
 import * as html from '../templates/dailyReminder.html'
console.log('htmlsss', html)
 function generateEmailParams(APODData: APODDto | string): SendEmailRequest {
    const sourceEmailAddress: string | undefined = process.env.sourceEmailAddress;
    const destinationEmailAddress: string| undefined = process.env.destinationEmailAddress;
console.log('csss', css.toString())
   // let template = '';
   const template =  ejs.render(html.default, APODData);
     //   template = str
   // });

    if(sourceEmailAddress === undefined || destinationEmailAddress === undefined) {
        throw new Error('Email address is undefined')
    }

    return {
        Source: sourceEmailAddress,
        Destination: {
            ToAddresses: [ destinationEmailAddress ]
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
                    Data: template,
                    Charset: "UTF-8"
                }
            }
        }
    }
 }

 async function getData(): Promise<APODDto | string> {
    const api_key: string | undefined = process.env.api_key;

    try {
        const res = await axios.get("https://api.nasa.gov/planetary/apod", {
            params: {
                api_key,
            }
        });
        return res.data;
      } catch {
        console.log("inside catch");
        return "this is not good, inner catch";
      }
 }

 export async function sendReminderDaily(): Promise <void> {
    const ses = new SES();
    const APODData = await getData()
    const emailTemplate = generateEmailParams(APODData)

    ses.sendEmail(emailTemplate, (err: AWSError, data: SendEmailResponse) => {
        if (err) console.log(err, err.stack);
          else console.log(data);
      });
 }
