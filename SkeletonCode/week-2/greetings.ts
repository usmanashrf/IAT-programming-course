// greetPerson: A function that takes a person's name as a 
//mandatory argument and returns a personalized greeting message.

function greetPerson(name: string): string {
    return `Write code to greet person`;
}

// greetTeam: An arrow function that takes a variable number of names 
//and returns a greeting message for the entire team.
const greetTeam = (...names: string[]): string => {
    const teamNames = names; // ADD CODE JOIN ARRAY ELEMENTS
    return `Write code to greet team`;
};


//if we want to get output with "and" word with last name of team member 
//then use below code

const greetTeam2 = (...names: string[]): string => {

    const lastPerson = names.pop(); // Remove the last person from the array
    const teamNames = names.join(', '); // Join the remaining names with commas
    return `ADD CODE HERE`;

};

//A lambda expression function that takes an optional name and returns a greeting message. 
//If no name is provided, it should give a generic greeting.
const greetGuest = (name?: string): string => {
    if (name) {
        return `ADD CODE HERE.`;
    } else {
        return "Hello, Guest! Welcome.";
    }
};

console.log(greetPerson("John")); //output: Hello, John! Welcome!
console.log(greetTeam("Alice", "Bob", "Charlie")); // output: Hello, Alice, Bob, Charlie! Welcome, team!
console.log(greetTeam2("Alice", "Bob", "Charlie")); // output: Hello, Alice, Bob, and Charlie! Welcome, team!
console.log(greetGuest()); //output: Hello, Guest! Welcome.
console.log(greetGuest("Mia")); //output: Hello, Mia! Welcome.