"use strict";
class Pet {
    constructor(name, type, defaultHunger = 50, defaultHappiness = 50) {
        this.name = name;
        this.type = type;
        this.hungerLevel = defaultHunger;
        this.happinessLevel = defaultHappiness;
    }
    feed() {
        this.hungerLevel -= 10;
        this.happinessLevel += 10;
    }
    play() {
        this.hungerLevel += 10;
        this.happinessLevel += 20;
    }
    displayDetails() {
        return `${this.name} (${this.type}) - Hunger: ${this.hungerLevel}, Happiness: ${this.happinessLevel}`;
    }
}
class Dog extends Pet {
    constructor(name, type, breed, defaultHunger = 40, defaultHappiness = 60) {
        super(name, type, defaultHunger, defaultHappiness);
        this.breed = breed;
    }
    interact() {
        return `${this.name} wags its tail happily.`;
    }
}
class Cat extends Pet {
    constructor(name, type, furColor, defaultHunger = 60, defaultHappiness = 40) {
        super(name, type, defaultHunger, defaultHappiness);
        this.furColor = furColor;
    }
    interact() {
        return `${this.name} purrs contentedly.`;
    }
}
// Create virtual pets
const dog = new Dog("Buddy", "Dog", "Golden Retriever");
const cat = new Cat("Whiskers", "Cat", "Calico");
// Display pet information
console.log("\n Virtual Pets------------:");
console.log(dog.displayDetails());
console.log(cat.displayDetails());
// Interact with the pets
console.log("\n Interactions----------:");
console.log(dog.interact());
console.log(cat.interact());
// Feed and play with the pets
console.log("\n Feeding and Playing--------:");
dog.feed();
cat.play();
// Display updated pet information
console.log("\n Updated Pet Details---------:");
console.log(dog.displayDetails());
console.log(cat.displayDetails());
