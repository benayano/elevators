import Floor from "./floor";

/**
 * Factory class for creating Floor objects
 */
export default class FloorFactory {
    /**
     * Creates a Floor object
     * @param floorNumber The number of the floor
     * @param floorId The ID of the floor element
     * @param goToFloor Function to be executed to move to a specific floor
     * @returns A new Floor object
     */
    static createFloor(floorNumber: number, floorId: string, goToFloor: (destinationFloor: number) => void): Floor {
        return new Floor(floorNumber, floorId, goToFloor);
    }
}
