class Pet {
    protected name: string;
    protected type: string;
    protected hungerLevel: number;
    protected happinessLevel: number;

    constructor(name: string, type: string, defaultHunger: number = 50, defaultHappiness: number = 50) {
        this.name = name;
        this.type = type;
        this.hungerLevel = defaultHunger;
        this.happinessLevel = defaultHappiness;
    }

    feed(): void {
        this.hungerLevel -= 10;
        this.happinessLevel += 10;
    }

    play(): void {
        this.hungerLevel += 10;
        this.happinessLevel += 20;
    }

    displayDetails(): string {
        return `${this.name} (${this.type}) - Hunger: ${this.hungerLevel}, Happiness: ${this.happinessLevel}`;
    }
}

class Dog extends Pet {
    private breed: string;

    constructor(name: string, type:string, breed: string, defaultHunger: number = 40, defaultHappiness: number = 60) {
        super(name, type, defaultHunger, defaultHappiness);
        this.breed = breed;
    }

    interact(): string {
        return `${this.name} wags its tail happily.`;
    }
}

class Cat extends Pet {
    private furColor: string;

    constructor(name: string, type:string, furColor: string, defaultHunger: number = 60, defaultHappiness: number = 40) {
        super(name, type, defaultHunger, defaultHappiness);
        this.furColor = furColor;
    }

    interact(): string {
        return `${this.name} purrs contentedly.`;
    }
}

// Create virtual pets
const dog = new Dog("Buddy","Dog","Golden Retriever");
const cat = new Cat("Whiskers", "Cat","Calico");

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