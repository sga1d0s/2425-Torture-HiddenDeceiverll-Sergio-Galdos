import { readFile } from 'fs/promises'
import PreciousStone from "./PreciousStone.mjs";
import Weapon from './Weapon.mjs';

const weapData = await readFile('./data/weapons.json', 'utf-8')
const charData = await readFile('./data/characters-hidden-deceiver.json', 'utf-8')
const stonData = await readFile('./data/precious-stones.json', 'utf-8')


// transformamos el contenido en un JSON
const weapons = JSON.parse(weapData)
const characters = JSON.parse(charData)
const stones = JSON.parse(stonData)
const arrayPreciousStone = []
const arrayWeapon = []

createPreciousStone()
createWeapon()


function createPreciousStone(){

  // itera el array
  for (let i = 0; i < stones.length; i++) {

    let stone = stones[i]

    let object = new PreciousStone(stone["name"], stone["description"], stone["value"])

    arrayPreciousStone.push(object)
  }
}

function createWeapon(){

  // itera el array
  for (let i = 0; i < weapons.length; i++) {

    let weapon = weapons[i]

    let object = new Weapon(weapon["name"], weapon["description"], weapon["num_die_damage"])

    arrayWeapon.push(object)
  }
}
