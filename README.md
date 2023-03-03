# Kuhne-Nagel-Intership-S2

This is the session 2 of the Kuhne Nagel intership I took part in.

### My contributions:

- api [Go to](https://github.com/silverpedak/Kuhne-Nagel-Intership-S2/tree/main/api)
- ui/src/api [Go to](https://github.com/silverpedak/Kuhne-Nagel-Intership-S2/tree/main/ui/src/api)
- ui/src/views/pages/location [Go to](https://github.com/silverpedak/Kuhne-Nagel-Intership-S2/tree/main/ui/src/views/pages/location)

# Location

The Location page provides an interactive interface where users can navigate through different levels of the map hierarchy by clicking on the relevant map markers.

When a location is selected, the component displays all the buildings within that location. Users can then click on a building to view all the floors within that building. Additionally, users can edit existing floors or add new floors.

Once a floor is selected, the component displays the floor plan, which includes all assets such as machines and other relevant data. Users can click on an asset to view detailed information about it, Additionally, users can edit and create new assets.

World -> Buildings -> Floors -> Floor -> Asset

Navigation between different levels is done with Tabs.

## WorldMapLeafletPanel

The WorldMapLeafletPanel utilises React Leaflet to display a map of the world with markers indicating the locations of different categories such as offices, manufacturing plants, warehouses, and sales points.

### Props

- `locations`: An array of Location objects representing the locations to be displayed on the map.
- `onViewBuildings`: A function that takes the ID of a location as input and is called when a location marker is clicked.
- `setCenter`: A function that takes a LatLngExpression object representing the new center of the map and updates the map accordingly.

## BuildingsMainPanel

The BuildingsMainPanel is an interactive feature that allows users to view all the buildings at a given location on a React Leaflet map. To enhance the user experience, vector layers are utilized to display the outline and area of each building in a distinct color. These colors correspond to the internal state of the assets, making it easy for users to quickly identify buildings that require attention.

### Props

- `center`: A LatLngExpression indicating the initial center of the map.
- `buildings`: An array of Building objects containing the details of each building to be displayed on the map.
- `navigateToPanel`: A function to navigate to another panel.
- `onViewFloors`: A function to view floors of a selected building.

## FloorsMainPanel

The FloorsMainPanel displays a list of floors belonging to a building, along with some statistics about each floor's occupancy. It provides the ability to create, view, edit, and delete floors.

### Props

- `floors`: an array of floor objects to display
- `building`: the building object that the floors belong to
- `navigateToPanel`: a function that is called when the "Back" button is clicked
- `onViewFloorPlan`: a function that is called when the floor is clicked for a floor. It takes the id of the floor as a parameter.

## FloorMainPanel

The FloorMainPanel uses ReactFlow to render a floor plan with draggable nodes that represent assets. These assets can be edited, their location can be change and finally the changes can be saved. When clicking on an asset it will display its details.

### Props

- `floor`: an object representing the floor, which contains properties such as `floorNr` and `name`.
- `rooms`: an array of objects representing the rooms on the floor.
- `navigateToPanel`: a function that is called when the "Back" button is clicked. It takes a string argument representing the route to navigate to.

## Technologies used in my implementation

- [ReactLeaflet](https://react-leaflet.js.org/)
- [ReactFlow](https://reactflow.dev/)
- [Axios](https://axios-http.com/)
- [ReactStrap](https://reactstrap.github.io)
