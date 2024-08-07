class Pokemon {
  constructor(id, ownerName, name, ability, positionX, positionY, speed, direction) {
    this.id = id;
    this.ownerName = ownerName; 
    this.name = name;
    this.ability = ability;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speed = speed;
    this.direction = direction;
  }
}

module.exports = Pokemon;
