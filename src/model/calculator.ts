import Elevator from "../viewObject/elevator";

/**
 * Class for calculating the best elevator to use based on busy time and distance
 */
export class TimeCalculator {
    private elevators: Elevator[];

    /**
     * Constructs a TimeCalculator object
     * @param elevators An array of Elevator objects
     */
    constructor(elevators: Elevator[]) {
        this.elevators = elevators;
    }

    /**
     * Calculates which elevator will be free the fastest
     * @param destination The floor to which an elevator is requested
     * @returns The index of the elevator that will be free the fastest
     */
    minElevatorBusy(destination: number): number {
        let min = 0;
        for (let i = 0; i < this.elevators.length; i++) {
            const currentElevatorTime = this.elevators[i].busyTime + this.distance(this.elevators[i].topFloor(), destination) * 0.5;
            const minElevatorTime = this.elevators[min].busyTime + this.distance(this.elevators[min].topFloor(), destination) * 0.5;
            if (currentElevatorTime < minElevatorTime) {
                min = i;
            }
        }
        return min ;
    }

    /**
     * Calculates the distance between two floors
     * @param floor The current floor
     * @param other The other floor
     * @returns The absolute distance between the two floors
     */
    distance(floor: number, other: number): number {
        return Math.abs(floor - other);
    }
}
