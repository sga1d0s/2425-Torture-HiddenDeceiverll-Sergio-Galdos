import { readFile } from 'fs/promises'
import PreciousStone from "./PreciousStone.mjs";
import Weapon from './Weapon.mjs';
import Character from './Character.mjs';
import { fork } from 'child_process';

const weapData = await readFile('./data/weapons.json', 'utf-8')
const charData = await readFile('./data/characters-hidden-deceiver.json', 'utf-8')
const stonData = await readFile('./data/precious-stones.json', 'utf-8')


// transformamos el contenido en un JSON
const weapons = JSON.parse(weapData)
const characters = JSON.parse(charData)
const stones = JSON.parse(stonData)
const arrayPreciousStone = []
const arrayWeapon = []
const arrayCharacter = []

// find weapons
createPreciousStone()
createWeapon()
createCharacter()

console.log("")
console.log("")
console.log("CHARACTER LIST")

showCharacters()

function createPreciousStone() {

  // itera el array
  for (let i = 0; i < stones.length; i++) {

    let stone = stones[i]

    let object = new PreciousStone(stone["name"], stone["description"], stone["value"])

    arrayPreciousStone.push(object)
  }
}

function createWeapon() {

  // itera el array
  for (let i = 0; i < weapons.length; i++) {

    let weapon = weapons[i]

    let object = new Weapon(weapon["name"], weapon["description"], weapon["num_die_damage"], weapon["type"], weapon["quality"])

    arrayWeapon.push(object)
  }
}

function createCharacter() {
  let weapon = null
  const arcane = findArcane()
  const bows = findBows()
  const wand = findWands()

  const arcaneRandom = findRandom(arcane)
  const bowRandom = findRandom(bows)
  const wandRandom = findRandom(wand)

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];

    if (character["occupation"] === "priest") {
      weapon = arcaneRandom
    }
    if (character["occupation"] === "thug") {
      weapon = bowRandom
    }
    if (character["occupation"] === "peasant") {
      weapon = wandRandom
    }

    let money = character["gold"]
    let pouch = getPouch(money, arrayPreciousStone).pouch
    let restMoney = getPouch(money, arrayPreciousStone).money


    let object = new Character(character["name"],
      character["occupation"],
      character["gold"],
      character["life"],
      weapon,
      pouch,
    )

    object.setGold(restMoney)

    arrayCharacter.push(object)
  }
}

function findArcane() {
  const arcane = []
  for (let index = 0; index < arrayWeapon.length; index++) {
    let element = arrayWeapon[index]
    // itera el objeto
    if (element.type = "arcane") {
      arcane.push(element)
    }
  }

  return arcane
}

function findBows() {
  const bows = []
  for (let index = 0; index < arrayWeapon.length; index++) {
    let element = arrayWeapon[index]
    // itera el objeto
    if (element.name.includes("Bow") || element.name.includes("bow")) {
      bows.push(element)
    }
  }

  return bows
}

function findWands() {
  const wands = []
  for (let index = 0; index < arrayWeapon.length; index++) {
    let element = arrayWeapon[index]
    // itera el objeto
    if (element.name.includes("wand") || element.name.includes("Wand")) {
      wands.push(element)
    }
  }

  return wands
}

function findRandom(array) {
  let max = array.length
  let randomNumber = Math.floor(Math.random() * (max))
  return array[randomNumber]
}

function getPouch(money, arrayPreciousStone) {
  let pouch = []

  while (money > 950 ) {
    let max = arrayPreciousStone.length
    let randomNumber = Math.floor(Math.random() * (max))
    const element = arrayPreciousStone[randomNumber];
    pouch.push(element)
    if (money > element.value) {
      money = money - element.value
    }
  }

  return { pouch, money }
}

function showCharacters() {
  for (let i = 0; i < arrayCharacter.length; i++) {

    const element = arrayCharacter[i];

    console.log("--------------")
    console.log(element.name)
    console.log("--------------")
    console.log("Occupation: " + element.occupation)
    console.log("Gold: " + element.gold + " coins")
    console.log("--------------")
    console.log("Weapon")
    console.log("--------------")
    console.log("Name: " + element.weapon.name)
    console.log("Description: " + element.weapon.description)
    console.log("Num Dies of Damage: " + element.weapon.num_die_damage)
    console.log("Type: " + element.weapon.type)
    console.log("Quality: " + element.weapon.quality)
    console.log("--------------")
    console.log("Pouch")
    console.log("--------------")

    // piedras
    for (let j = 0; j < element.pouch.length; j++) {
      const stone = element.pouch[j];
      console.log(stone.name + " : " + stone.value)
    }

    console.log("")
    console.log("")
  }
}