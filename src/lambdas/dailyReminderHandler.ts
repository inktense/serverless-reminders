import { APIGatewayProxyHandler } from 'aws-lambda';
import { sendReminderDaily } from '../services/dailyReminder';

export const sendDailyReminder: APIGatewayProxyHandler = async (_event, _context) => {
 // console.log('here>')

  await sendReminderDaily();

  return {
    statusCode: 200,
    body: JSON.stringify("Done", null, 2),
  };
}