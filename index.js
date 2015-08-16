import calendar from './calendar';
import routes from './routes';
import routeToEvent from './route-to-event.json';

function getEvent(route) {
    let events = calendar.getEvents();
    let map = routeToEvent.filter((item) => {
        return item.routeId === route.properties.Id;
    }).pop();
    if (!map) {
        return;
    }
    let event = events.filter((item) => {
        return item.getFirstPropertyValue('uid') === map.eventId;
    }).pop();
    if (!event) {
        return;
    }
    return new calendar.Event(event);
}

function getNextRecycleDate(point, fromDate = new Date()) {
    let route = routes.getRoute(point);
    let event = getEvent(route);
    let startDate = event.startDate;
    fromDate = calendar.Time.fromJSDate(fromDate);
    if (startDate.compare(fromDate) < 0) {
        let interval = event.component.getFirstPropertyValue('rrule').interval;
        // TODO: support more recurrence types
        if (event.getRecurrenceTypes().WEEKLY) {
            startDate.adjust(7 * interval);
        }
    }
    let iterator = event.iterator(startDate);
    let recycleDate = null;
    while (!recycleDate) {
        let next = iterator.next();
        if (calendar.Time[route.properties.PICKUP.toUpperCase()] === next.dayOfWeek()) {
            recycleDate = next;
        }
    }
    return recycleDate.toJSDate();
}

console.log(getNextRecycleDate([-88.271913, 44.267002]));
console.log(getNextRecycleDate([-88.271913, 44.267002], new Date('August 26, 2015 00:00:00')));
console.log(getNextRecycleDate([-88.271913, 44.267002]));
