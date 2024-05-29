<img src="https://github.com/benayano/elevators/blob/main/public/images/example.png" alt="Elevator Control System" width="450" height="350">

# Elevator Control System

This project is a simulation of an elevator control system. It includes multiple elevators and floors, and allows for the control and visualization of the elevators' movements between floors.

## Features

- Multiple elevators and floors.
- Visual representation of the building, elevators, and floors.
- Simulation of elevator movement with delays and color change on floor arrival.
- Optimized elevator selection based on availability and distance.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/benayano/elevators.git
Install the dependencies:
bash
Copy code
npm install
# or
yarn install
Running the Project
To run the project locally, use the following command:

bash
Copy code
npm start
# or
yarn start
This will start a development server and open the application in your default browser. The building, elevators, and floors will be displayed, and you can interact with the system.

Building for Production
To create a production build, use the following command:

bash
Copy code
npm run build
# or
yarn build
This will generate a dist folder containing the optimized production files.

Project Structure
public/ - Static assets like images, styles, and HTML.
src/ - Source files for the application.
index.ts - Entry point of the application.
app.ts - Main application logic.
config.ts - Configuration for the building.
model/ - Contains the calculator.ts for elevator time calculations.
viewObject/ - Contains the main components like building.ts, creator.ts, elevator.ts, floor.ts, and floorFactory.ts.
Usage
Click on a floor to request an elevator.
The system will highlight the requested floor and move the nearest available elevator.
The color of the floor will change when the elevator arrives.
Contributing
If you would like to contribute to the project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Thanks to Your Name for the initial implementation.
Inspiration and guidance from the community.
