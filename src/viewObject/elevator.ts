/**
 * Class representing an Elevator
 */
export default class Elevator {
    private width: number = 80;
    private height: number = 100;
    private currentFloor: number = 0;
    private timePerFloor: number = 0.5;
    private onFloorClick: (currentFloor: number) => void;
    private floorQueue: number[] = [];
    public busyTime: number = 0;
    private elevatorId: string;
    private numberOfFloors: number;

    /**
     * Constructs an Elevator object
     * @param elevatorId Unique identifier for the elevator
     * @param numberOfFloors Number of floors in the building
     * @param onFloorClick Function to be executed when a floor is clicked
     */
    constructor(elevatorId: string, numberOfFloors: number, onFloorClick: (currentFloor: number) => void) {
        this.onFloorClick = onFloorClick;
        this.elevatorId = elevatorId;
        this.numberOfFloors = numberOfFloors;
    }

    /**
     * Returns the last floor in the queue
     * @returns The last floor in the queue or the current floor if the queue is empty
     */
    topFloor(): number {
        if (this.floorQueue.length === 0) {
            return this.currentFloor;
        } else {
            return this.floorQueue[this.floorQueue.length - 1];
        }
    }

    /**
     * Adds a floor to the queue of target floors
     * @param floor The floor to add to the queue
     */
    addFloor(floor: number) {
        const lastFloor = this.topFloor();
        this.floorQueue.push(floor);

        const travelTime = Math.abs(lastFloor - floor) * this.timePerFloor;
        this.busyTime += travelTime + 2;

        if (this.floorQueue.length === 1) {
            this.processQueue();
        }
    }

    /**
     * Processes the queue of target floors
     * Calls the onFloorClick function with the next floor in the queue
     */
    private processQueue() {
        if (this.floorQueue.length === 0) return;

        const destinationFloor = this.floorQueue[0];
        this.onFloorClick(destinationFloor);
    }

    /**
     * Completes the current request after a delay
     * Moves the elevator to the next floor in the queue if there is one
     */
    completeCurrentRequest() {
        setTimeout(() => {
            const currentFloor = this.floorQueue[0];
            this.floorQueue.shift();

            if (this.floorQueue.length > 0) {
                const nextFloor = this.floorQueue[0];
                const travelTime = Math.abs(currentFloor - nextFloor) * this.timePerFloor;
                this.busyTime -= travelTime + 2;
            } else {
                this.busyTime = 0;
            }

            this.processQueue();
        }, 2000);
    }

    /**
     * Creates and returns an HTML element representing the elevator
     * @returns An HTML image element of the elevator
     */
    getElevator(): HTMLImageElement {
        const imgElement = document.createElement('img');
        imgElement.className = "elevator";
        imgElement.style.width = `${this.width}px`;
        imgElement.style.height = `${this.height}px`;
        imgElement.src = "./images/elv.png";
        imgElement.id = this.elevatorId;
        imgElement.onclick = () => this.onFloorClick(this.currentFloor);
        return imgElement;
    }

    /**
     * Moves the elevator to the destination floor
     * @param destinationFloor The floor to move the elevator to
     */
    moveToFloor(destinationFloor: number) {
        const distance = (destinationFloor - this.currentFloor) * 117;

        const elevatorElement = document.getElementById(this.elevatorId);
        if (elevatorElement) {
            const currentTranslation = elevatorElement.style.transform.match(/translateY\((-?\d+)px\)/);
            const currentTranslationY = currentTranslation ? parseInt(currentTranslation[1], 10) : 0;
            const newTranslationY = currentTranslationY - distance;
            const maxTranslationY = -(this.numberOfFloors - 1) * 117;

            if (newTranslationY <= 0 && newTranslationY >= maxTranslationY) {
                elevatorElement.style.transition = `transform ${Math.abs(distance) / 117 * this.timePerFloor}s ease-in-out`;
                elevatorElement.style.transform = `translateY(${newTranslationY}px)`;

                elevatorElement.addEventListener('transitionend', () => {
                    this.currentFloor = destinationFloor;
                    this.completeCurrentRequest();
                }, { once: true });
            } else {
                console.warn("Attempted to move elevator out of bounds");
            }
        }
    }
}
