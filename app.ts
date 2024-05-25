import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Player {
    private name: string;
    private health: number;
    private energy: number;
    private explored: boolean;
    private rested: boolean;

    constructor(name: string, health: number, energy: number) {
        this.name = name;
        this.health = health;
        this.energy = energy;
        this.explored = false;
        this.rested = false;
    }

    getName(): string {
        return this.name;
    }

    getHealth(): number {
        return this.health;
    }

    getEnergy(): number {
        return this.energy;
    }

    hasExplored(): boolean {
        return this.explored;
    }

    hasRested(): boolean {
        return this.rested;
    }

    updateHealth(value: number) {
        this.health += value;
    }

    updateEnergy(value: number) {
        this.energy += value;
    }

    setExplored() {
        this.explored = true;
    }

    setRested() {
        this.rested = true;
    }
}

// Game logic
function gameLoop(player: Player) {
    console.log(`Welcome, ${player.getName()}!`);
    console.log("You find yourself in a mysterious forest. What do you do?");

    rl.question("Enter your action (explore/rest): ", (action: string) => {
        switch(action.toLowerCase()) {
            case 'explore':
                console.log("You start exploring...");
                // Simulate exploring by deducting energy
                player.updateEnergy(-10);
                console.log(`You feel tired. Energy remaining: ${player.getEnergy()}`);
                player.setExplored();
                break;
            case 'rest':
                console.log("You decide to take a rest...");
                // Simulate resting by restoring some energy and health
                player.updateEnergy(20);
                player.updateHealth(10);
                console.log(`You feel refreshed. Energy: ${player.getEnergy()}, Health: ${player.getHealth()}`);
                player.setRested();
                break;
            default:
                console.log("Invalid action. Please enter 'explore' or 'rest'.");
                break;
        }

        // Check if the player has explored and rested
        if (player.hasExplored() && player.hasRested()) {
            console.log("You have explored and rested. The game ends.");
            rl.close(); // End the readline interface
        } else {
            // Continue the game loop
            gameLoop(player);
        }
    });
}

// Create a player
const player1 = new Player("Player 1", 100, 100);

// Start the game loop
gameLoop(player1);

