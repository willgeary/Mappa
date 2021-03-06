// -----------
// Tiled Map
// -----------

import { parseGeoJSON } from '../../utils/parseGeoJSON';

class TileMap {
  constructor(options){
    this.options = options;
    this.scriptTag;
    this.mappaDiv = null;
  }

  init() {
    if(!document.getElementById(this.options.provider)) {
      this.scriptTag = document.createElement('script');
      this.scriptTag.type = 'text/javascript';
      this.scriptTag.src = this.script;
      this.scriptTag.id = this.options.provider;
      document.head.appendChild(this.scriptTag);
      if(this.style) {
        let styleTag = document.createElement('link');
        styleTag.rel = 'stylesheet';
        styleTag.href = this.style;
        document.head.appendChild(styleTag);
      }
    }
  }

  overlay(canvas, callback){
    this.scriptTag.onload = () => {
      this.mappaDiv = document.createElement('div');
      document.body.appendChild(this.mappaDiv);
      this.mappaDiv.setAttribute('style', 'position:relative;width:'+ canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:10');
      this.mappaDiv.setAttribute('id', 'mappa');
      canvas.elt != undefined ? this.canvas = canvas.elt : this.canvas = canvas;
      this.createMap();
      callback && callback();
    };
  }

  latLngToPixel(...args){
    let pos;
    (typeof args[0] == 'object') ? pos = args[0] : pos = {lat: Number(args[0]), lng: Number(args[1])};
    return this.fromLatLngtoPixel(pos);
  }

  pixelToLatLng(...args){
    return this.fromPointToLatLng(...args);
  }

  geoJSON(...args){
    return parseGeoJSON(args[0], args[1]);
  }

  zoom(){
    return Math.floor(this.getZoom());
  }

}

export { TileMap };
