export default class Weapon {

  constructor(name, description, numDieDamage, type, quality) {
    this.name = name;
    this.description = description;
    this.numDieDamage = numDieDamage;
    this.type = type;
    this.quality = quality;
  }

  attack(enemy){

    // weapon damage = ND6 + 2
    let wDamage

    for (let i = 0; i < this.numDieDamage; i++) {
      let randomNumber = Math.floor(Math.random() * (6))
      wDamage += randomNumber      
    }
    return wDamage  = wDamage +2
  }

}