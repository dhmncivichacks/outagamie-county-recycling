# outagamie-county-recycling

Outagamie County recycling route geodata.

This is a WIP, but for now, you can find out when your next recycling day is!

# Install

```
npm install outagamie-county-recycling
```

# Usage

```js
import {getNextRecycleDate} from 'outagamie-county-recycling';

let longitude = -88.261194;
let latitude = 44.290477;

let date = getNextRecycleDate([longitude, latitude]);
console.log(date.toString());
// > Mon Sep 07 2015 00:00:00 GMT-0500 (CDT)
```

# API

## `getNextRecycleDate(point[, date])`

Arguments:
- `point {Array}` - longitude and latitude values.
- `date {Date}` - (optional) defaults to now.

Returns:
- `Date` - a javascript date object.

# Support

To see if your location is supported by this data, [check the map]().

# License

MIT
