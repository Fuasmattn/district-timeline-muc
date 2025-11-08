import Raphael from 'raphael';
import { ColorLuminance } from './utils.js';
import { mapPaths } from './map-data.js';

export function initMap() {
  const w = 600;
  const h = 450;
  
  const map = Raphael('map', '600', '600');
  map.setViewBox(0, 150, w, h, true);
  map.setSize('100%', '100%');

  const munich = map.set();
  munich.attr({'name': 'munich'});

  // Create all district paths from data
  const paths = [];
  mapPaths.forEach(pathData => {
    const path = map.path(pathData.path);
    path.attr({
      id: pathData.id,
      fill: '#E0E9F6',
      stroke: '#ffffff',
      'stroke-width': '0.8',
      'stroke-miterlimit': '10',
      parent: 'munich',
      'stroke-opacity': '1'
    });
    path.data('id', pathData.id);
    path.node.id = pathData.id;
    paths.push(path);
    munich.push(path);
  });

  // Add hover interactions
  paths.forEach(path => {
    const oldFill = path.node.getAttribute('fill');
    
    path.mouseover(function(e) {
      const newFill = ColorLuminance(oldFill, -0.05);
      this.node.setAttribute('fill', newFill);
    });
    
    path.mouseout(function(e) {
      this.node.setAttribute('fill', oldFill);
    });
  });

  return map;
}
