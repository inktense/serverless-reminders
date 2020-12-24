//import 'source-map-support/register';
import { sendReminderWeekend } from '../services/weeklyReminder';

module.exports.sendWeekendReminder = (_event, _context) => {
 // console.log('here>')

 sendReminderWeekend();

  return {
    statusCode: 200,
    body: JSON.stringify("Done", null, 2),
  };
}