import fs from 'fs';
import ical from 'ical.js';

let calendarFile = fs.readFileSync(__dirname + '/../../data/recycling-calendar.ics', 'utf-8');

export default {
    getEvents: function () {
        let calendar = new ical.Component(ical.parse(calendarFile));
        return calendar.getAllSubcomponents('vevent');
    },
    Event: ical.Event,
    Time: ical.Time
};
