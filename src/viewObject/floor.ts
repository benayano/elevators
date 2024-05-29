/**
 * Class representing a Floor
 */
export default class Floor {
    private width: number = 300;
    private height: number = 110;
    private floorNumber: number;
    private floorId: string;
    private clickable: boolean = true;

    goToFloor: (destinationFloor: number) => void;

    /**
     * Constructs a Floor object
     * @param floorNumber The number of the floor
     * @param floorId The ID of the floor element
     * @param goToFloor Function to be executed to move to a specific floor
     */
    constructor(floorNumber: number, floorId: string, goToFloor: (destinationFloor: number) => void) {
        this.floorNumber = floorNumber;
        this.goToFloor = goToFloor;
        this.floorId = floorId;
    }

    /**
     * Creates and returns an HTML element representing the floor
     * @returns An HTML div element of the floor
     */
    getFloor(): HTMLDivElement {
        const divElement = document.createElement('div');
        divElement.className = "floor";
        divElement.style.width = `${this.width}px`;
        divElement.style.height = `${this.height}px`;

        const floorText = document.createElement('div');
        floorText.className = "metal linear";
        floorText.id = this.floorId;
        floorText.style.width = `100px`;
        floorText.style.height = `80%`;
        floorText.onclick = () => {
            if (this.clickable) {
                this.goToFloor(this.floorNumber);
            }
        };
        floorText.textContent = `${this.floorNumber}`;

        divElement.appendChild(floorText);
        return divElement;
    }

    /**
     * Changes the color of the floor element for a given time period
     * @param timeToChange Time in seconds to change the color
     */
    waitArrivedTime(timeToChange: number) {
        const floorElem = document.getElementById(this.floorId) as HTMLElement;
        if (floorElem) {
            this.clickable = false; 
            floorElem.style.color = 'green';
            setTimeout(() => {
                floorElem.style.color = 'hsla(0,0%,20%,1)'; 
                // Play ding sound
                const audio = new Audio('./sounds/ding.mp3');
                audio.play();
            }, (timeToChange - 2) * 1000);
            setTimeout(() => {
                this.clickable = true; 
            }, timeToChange * 1000);
        }
    }
}
