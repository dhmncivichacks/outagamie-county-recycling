import fs from 'fs';
import Terraformer from 'terraformer';

let geojsonFile = fs.readFileSync(__dirname + '/../../data/recycling-routes.geojson', 'utf-8');
let geojson = JSON.parse(geojsonFile);

export default {
    getRoute: function (point) {
        let currentLocation = new Terraformer.Point(point);
        return geojson.features.filter((feature) => {
            let geometry = new Terraformer.Primitive(feature.geometry);
            return currentLocation.within(geometry);
        }).pop();
    }
};
