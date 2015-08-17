import calendar from './calendar';
import routes from './routes';
import routeToEvent from '../data/route-to-event.json';

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

function getNextIntervalWeekInDays(interval, seconds) {
    let days = seconds / 60 / 60 / 24;
    let weeks = Math.ceil(days / 7);
    let nextInterval = Math.max(1, Math.ceil(weeks / interval));
    return (7 * interval * nextInterval);
}

function getNextRecycleDate(point, fromDate = new Date()) {
    let route = routes.getRoute(point);
    let event = getEvent(route);
    let startDate = event.startDate;
    let fromTime = calendar.Time.fromJSDate(fromDate);
    fromTime.resetTo(fromTime.year, fromTime.month, fromTime.day, 0, 0, 0, fromTime.zone);
    let difference = fromTime.subtractDate(startDate);
    let interval = event.component.getFirstPropertyValue('rrule').interval;
    // TODO: support more recurrence types
    if (event.getRecurrenceTypes().WEEKLY) {
        let offset = (calendar.Time[route.properties.PICKUP.toUpperCase()] - startDate.toJSDate().getDay() - 1) * 24 * 60 * 60;
        startDate.adjust(getNextIntervalWeekInDays(interval, difference.toSeconds() - offset));
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

export {getNextRecycleDate};
