import Elevator from "./elevator";
import Floor from "./floor";
import FloorFactory from "./floorFactory";

type FloorClickHandler = (destinationFloor: number) => void;
type ElevatorClickHandler = (currentFloor: number, elevatorIndex: number) => void;

/**
 * Creator class for creating Elevator and Floor objects
 */
export default class Creator {
    private numberOfFloors: number;
    private numberOfElevators: number;
    private buildingIndex: number;
    private elevators: Elevator[];
    private floors: Floor[];

    /**
     * Constructs a Creator object
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
    }

      /**
     * Creates Elevator objects
     * @param onElevatorClick Function to be executed when an elevator is clicked
     * @returns An array of Elevator objects
     */
      createElevators(onElevatorClick: ElevatorClickHandler): Elevator[] {
        for (let i = 0; i < this.numberOfElevators; i++) {
            const elevator = new Elevator(`elevatorId${this.buildingIndex}-${i}`, this.numberOfFloors, (currentFloor: number) => {
                onElevatorClick(currentFloor, i);
            });
            this.elevators.push(elevator);
        }
        return this.elevators;
    }

    /**
     * Creates Floor objects
     * @param onFloorClick Function to be executed when a floor is clicked
     * @returns An array of Floor objects
     */
    createFloors(onFloorClick: FloorClickHandler): Floor[] {
        for (let i = 0; i < this.numberOfFloors; i++) {
            const floorNumber = this.numberOfFloors - i - 1;
            const floorId = `floorId-${this.buildingIndex}-${floorNumber}`;
            const floor = FloorFactory.createFloor(floorNumber, floorId, onFloorClick);
            this.floors.push(floor);
        }
        return this.floors;
    }
}
