//import 'source-map-support/register';
import { sendReminderDaily } from '../services/dailyReminder';

module.exports.sendDailyReminder = (_event, _context) => {
 // console.log('here>')

  sendReminderDaily();

  return {
    statusCode: 200,
    body: JSON.stringify("Done", null, 2),
  };
}