import "../../public/help.css";
import { TimeCalculator } from "../model/calculator";
import Elevator from "./elevator";
import Floor from "./floor";
import Creator from "./creator";

/**
 * Class representing a Building with multiple floors and elevators
 */
export default class Building {
    private timeCalculator: TimeCalculator;
    private numberOfFloors: number;
    private numberOfElevators: number;
    private buildingIndex: number;
    private elevators: Elevator[];
    private floors: Floor[];

    /**
     * Constructs a Building object
     * @param numberOfFloors Number of floors in the building
     * @param numberOfElevators Number of elevators in the building
     * @param buildingIndex Index of the building
     */
    constructor(numberOfFloors: number, numberOfElevators: number, buildingIndex: number) {
        this.numberOfFloors = numberOfFloors;
        this.numberOfElevators = numberOfElevators;
        this.buildingIndex = buildingIndex;
        this.elevators = [];
        this.floors = [];

        const creator = new Creator(numberOfFloors, numberOfElevators, buildingIndex);
        this.elevators = creator.createElevators((currentFloor: number, elevatorIndex: number) => {
            this.moveToFloor(currentFloor, elevatorIndex);
        });
        this.floors = creator.createFloors((destinationFloor: number) => {
            this.getToFloor(destinationFloor, this.timeCalculator.minElevatorBusy(destinationFloor));
        });

        this.timeCalculator = new TimeCalculator(this.elevators);
    }

    /**
     * Calls the elevator's internal function to move to the specified floor
     * @param destinationFloor The floor to move the elevator to
     * @param elevatorIndex The index of the elevator to move
     */
    moveToFloor(destinationFloor: number, elevatorIndex: number) {
        this.elevators[elevatorIndex].moveToFloor(destinationFloor);
    }

    /**
     * Takes an elevator to the specified floor
     * @param destinationFloor The floor to move the elevator to
     * @param elevatorIndex The index of the elevator to move
     */
    getToFloor(destinationFloor: number, elevatorIndex: number) {
        if (destinationFloor != this.elevators[elevatorIndex].topFloor()) {
            const elevator = this.elevators[elevatorIndex];
            elevator.addFloor(destinationFloor);
            this.floors[(this.floors.length - destinationFloor) - 1].waitArrivedTime(elevator.busyTime);
        }
    }

    /**
     * Creates and returns an HTML element representing the building
     * @returns An HTML div element of the building
     */
    getBuilding(): HTMLDivElement {
        const buildingElement = document.createElement('div');
        buildingElement.style.display = 'flex';
        buildingElement.style.flexDirection = 'row';

        const floorsDiv = document.createElement('div');
        this.floors.forEach(floor => {
            floorsDiv.appendChild(floor.getFloor());
        });

        const elevatorsDiv = document.createElement('div');
        elevatorsDiv.className = "elevatorContainer";
        elevatorsDiv.style.position = 'relative';

        for (let i = 0; i < this.numberOfElevators; i++) {
            const elevatorElement = this.elevators[i].getElevator();
            elevatorElement.id = `elevatorId${this.buildingIndex}-${i}`;
            elevatorsDiv.appendChild(elevatorElement);
        }

        buildingElement.appendChild(floorsDiv);
        buildingElement.appendChild(elevatorsDiv);

        return buildingElement;
    }
}
