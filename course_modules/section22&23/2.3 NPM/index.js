import generateName from "sillyname";
import superheroes from "superheroes";

const sillyName = generateName();
const heroName = superheroes.random();

console.log(`My name is ${sillyName} and my hero name is ${heroName}.`);