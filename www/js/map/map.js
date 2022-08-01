class Pixel {
  id = null;
  coords = null;
  type = null; // land / sea / city / mountain
  owner = null; // the player controlling the pixel

  constructor(params) {
    this.coords = {
      x: params.coords.x,
      y: params.coords.y
    }
    this.type = params.type;
    this.owner = params.owner;

  }
  owner = {
    get: function() { return this.owner;},
    set: function(owner) {
      this.owner = this.type !== 'water' ? owner : null
      if (this.type === 'city') {
        this.city.changeOwner(owner);
      }
    }
  }

  setCity(args) {
    // should be done on init only
    this.city = new City({...args, owner: this.getOwner()})
  }

  loosePop(percentage) {
    this.city.loosePop(percentage)
  }


}

class City {
  name = null;
  population = null;
  owner = null

  constructor(args) {
    this.name = args.name;
    this.population = args.population;
    this.owner = args.owner
  }

  loosePop(percentage){
    this.population = this.population - this.population/percentage
  }

  changeOwner(owner) {
    this.owner = owner;
  }

}

class User {
  name = null;
  country = null;

  constructor(args) {
    this.country = new Country() // need to create this class from countries.js data
  }
}


class Map {
  map = null;

  generateMap(typeMap, ownerMap) {
    this.map = inputMap.map((row, y) => row.map((type, x) => new Pixel({
      coords: {
        x:y,
        y:x
      },
      type: type === 0 ? 'water' : 'land',
      owner: ownerMap[y][x]
    }))).flat();
  }

  findDistance(firstCoords, secondCords) {
    return Math.sqrt(firstCoords**2 + secondCoords**2);
  }

  invade(invasion_coords, attacker_power, defender_power) {
    if (attacker_power <= defender_power) {
      return false;
    }
    
    let attackPenalty = 0.8;
    
  }

  initCities() {
    const { CITY_LIST } = require('cities')
    CITY_LIST.forEach(city => {
      let cityPoint = this.points.find(point => (point.x === city.x && point.y === city.y))
      cityPoint.setCity(city);
    });
  }
  isBorder(coords) {
    let owner = this.points.find(el => el.coords === coords).getOwner();
    let neighbors = [-1, 0, 1].map(dx => (
      [-1, 0, 1].map(dy => (
        this.points.find(el => (
          el.coords === {x: el.coords.x + dx,
                         y: el.coords.y + dy}
        ))
      ))
    )).flat();
    return !neighbors.every(pixel => pixel.getOwner() === owner);
  }
}
