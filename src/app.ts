import Building from "./viewObject/building";
import buildingsConfig from "./config";

export default class App {
    buildings: Building[];

    constructor() {
        this.buildings = buildingsConfig.map((item, index) => {
            return new Building(item.floors, item.elevators, index);
        });
    }

    run() {
        const container = document.getElementById("buildingContainer");
        if (container) {
            this.buildings.forEach(building => {
                container.appendChild(building.getBuilding());
            });
        } else {
            console.error("Failed to find the element with ID 'buildingContainer'");
        }
    }
}
