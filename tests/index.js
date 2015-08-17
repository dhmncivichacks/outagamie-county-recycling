import tape from 'tape';
import {getNextRecycleDate} from '../lib';

const location1 = [-88.271913, 44.267002];
const location2 = [-88.261194, 44.290477];

let tests = [
    {
        name: '[location1] week before',
        location: location1,
        fromDate: 'August 16, 2015',
        expected: 'Tue Aug 25 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location1] day before',
        location: location1,
        fromDate: 'August 24, 2015',
        expected: 'Tue Aug 25 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location1] day of',
        location: location1,
        fromDate: 'August 25, 2015',
        expected: 'Tue Aug 25 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location1] day after',
        location: location1,
        fromDate: 'August 26, 2015',
        expected: 'Tue Sep 08 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location1] next interval - day before',
        location: location1,
        fromDate: 'September 7, 2015',
        expected: 'Tue Sep 08 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location1] next interval - day of',
        location: location1,
        fromDate: 'September 8, 2015',
        expected: 'Tue Sep 08 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location1] next interval - day after',
        location: location1,
        fromDate: 'September 9, 2015',
        expected: 'Tue Sep 22 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] week before',
        location: location2,
        fromDate: 'August 16, 2015',
        expected: 'Mon Aug 24 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] day before',
        location: location2,
        fromDate: 'August 23, 2015',
        expected: 'Mon Aug 24 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] day of',
        location: location2,
        fromDate: 'August 24, 2015',
        expected: 'Mon Aug 24 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] day after',
        location: location2,
        fromDate: 'August 25, 2015',
        expected: 'Mon Sep 07 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] next interval - day before',
        location: location2,
        fromDate: 'September 6, 2015',
        expected: 'Mon Sep 07 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] next interval - day of',
        location: location2,
        fromDate: 'September 7, 2015',
        expected: 'Mon Sep 07 2015 00:00:00 GMT-0500 (CDT)'
    },
    {
        name: '[location2] next interval - day after',
        location: location2,
        fromDate: 'September 8, 2015',
        expected: 'Mon Sep 21 2015 00:00:00 GMT-0500 (CDT)'
    },
];

tests.forEach(test => {
    tape(test.name, t => {
        t.equal(
            getNextRecycleDate(test.location, new Date(test.fromDate + ' 00:00:00')).toString(),
            test.expected);
        t.equal(
            getNextRecycleDate(test.location, new Date(test.fromDate + ' 23:59:59')).toString(),
            test.expected);
        t.end();
    })
});
