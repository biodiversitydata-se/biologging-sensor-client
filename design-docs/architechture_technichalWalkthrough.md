# Project Architecture Diagram

```mermaid
graph TD
    Client[Client] -->|HTTP Requests| Backend[Backend Server]
    Backend -->|Fetches Data| Database[Database]
    Backend -->|API Endpoints| api{api}
    api --> dataset{dataset}
    api --> event{event}
    api --> instrument{instrument}
    api --> organism{organism}
    api --> project{project}
    api --> record{record}
    
    Client -->|User Interactions| app{App}
    app --> about{About}
    app --> detail{Detail}
    detail --> id{Detail Page}
    app --> visualisation{Visualisation}
    visualisation --> id{Visualisation Page}
    
    id --> actogram{Actogram}
    id --> line{Line Graph}
    id --> map{Map}
    
    Client -->|Loads| assets{Assets}
    assets --> images{Images}
    
    Client -->|Uses| components{Components}
    components --> graphs{Graphs}
    components --> overview{Overview}
    graphs --> actogram{Actogram}
    graphs --> line{Line Graph}
    graphs --> map{Map}
    
    Client -->|Utilizes| hooks{Hooks}
    hooks --> sensorSelectContext{Sensor Select Context}
    
    style Client fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style Backend fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style Database fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style api fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style app fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style assets fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style components fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style hooks fill:#6FB1FC,stroke:#333,stroke-width:2px;
    style dataset fill:#65E6A5,stroke:#333,stroke-width:2px;
    style event fill:#65E6A5,stroke:#333,stroke-width:2px;
    style instrument fill:#65E6A5,stroke:#333,stroke-width:2px;
    style organism fill:#65E6A5,stroke:#333,stroke-width:2px;
    style project fill:#65E6A5,stroke:#333,stroke-width:2px;
    style record fill:#65E6A5,stroke:#333,stroke-width:2px;
    style about fill:#65E6A5,stroke:#333,stroke-width:2px;
    style detail fill:#65E6A5,stroke:#333,stroke-width:2px;
    style visualisation fill:#65E6A5,stroke:#333,stroke-width:2px;
    style images fill:#65E6A5,stroke:#333,stroke-width:2px;
    style graphs fill:#65E6A5,stroke:#333,stroke-width:2px;
    style overview fill:#65E6A5,stroke:#333,stroke-width:2px;
    style actogram fill:#65E6A5,stroke:#333,stroke-width:2px;
    style line fill:#65E6A5,stroke:#333,stroke-width:2px;
    style map fill:#65E6A5,stroke:#333,stroke-width:2px;
    style sensorSelectContext fill:#65E6A5,stroke:#333,stroke-width:2px;


```

# The System Architecture
<details>
  <summary><strong>The System Architecture Diagram </strong></summary>

```mermaid
flowchart LR
    subgraph "Client-Side (Frontend)"
        Client(Browser) --> App
        App -->|Routing| About
        App -->|Routing| Detail
        App -->|Routing| Visualisation
        Visualisation -->|Actogram| Actogram
        Visualisation -->|Line Graph| LineGraph
        Visualisation -->|Map| Map
        App -->|Assets| Assets
        App -->|Components| Components
        Components -->|Graphs| Graphs
        Components -->|Overview| Overview
        Components -->|Hooks| Hooks
    end

    subgraph "Backend-Side (Server)"
        BackendServer -->|HTTP Requests| Client
        BackendServer -->|API Endpoints| APIEndpoints
        APIEndpoints -->|Fetch Data| Database
        subgraph "Sub-APIs"
            Dataset
            Event
            Instrument
            Organism
            Project
            Record
        end
    end

    subgraph "Data Flow and Interactions"
        Client -->|HTTP Requests| BackendServer
        BackendServer -->|Processing| Database
        Database -->|Data| BackendServer
        BackendServer -->|Data| Client
    end

    subgraph "Directory Structure"
        subgraph "api"
            api.ts
            interface.ts
            apiService.ts
        end
        subgraph "app"
            about
            detail
            visualisation
        end
        assets
        subgraph "components"
            graphs
            overview
            hooks
        end
    end

    style Client-Side,Backend-Side,Data-Flow,Directory-Structure fill:#f9f,stroke:#333,stroke-width:2px
    style Client-Side fill:#77DD77
    style Backend-Side fill:#FFA07A
    style Data-Flow fill:#ADD8E6
    style Directory-Structure fill:#FFD700

```
</details>

# Directory Breakdown

<details>
    <summary><strong>Tree of the Root Directory</strong></summary>
    
```plaintext
Root Directory
├───api
│   ├───dataset
│   ├───event
│   ├───instrument
│   ├───organism
│   ├───project
│   └───record
├───app
│   ├───about
│   ├───detail
│   │   └───[id]
│   └───visualisation
│       └───[id]
├───assets
│   └───images
├───components
│   ├───graphs
│   │   ├───actogram
│   │   ├───line
│   │   └───map
│   └───overview
└───hooks
    └───sensorSelectContext
```
</details>

<details>
  <summary><strong>api</strong></summary>
  Contains various subdirectories that handle different types of data and interactions:

# Summary of API Directory

## General Structure
### `api.ts`
This file defines the API functions for interacting with the specific type of data-related endpoints:

- **getItems**: Fetches all items (datasets, events, instruments, organisms, projects, or records).
- **getItem**: Fetches a specific item by ID.
- **filterItems**: Filters items based on provided criteria.

### `interface.ts`
This file contains TypeScript interfaces that define the structure of the specific type of data:

- **Item**: Represents the main item structure with relevant fields.
- **Contact**: Represents contact information with fields for `firstName`, `lastName`, `email`, `userid`, and `webpage`.
- **Taxon**: Represents taxonomic coverage including fields for `taxonScientificName`, `taxonCommonName`, and `dyntaxaId`.
- **GeographicWENS**: Represents geographical coverage with coordinates and a description.
- **RangeDateTime**: Represents temporal coverage with `startDatetime` and `endDateTime`.
- **Reference**: Represents bibliographic citation with `DOI` and `title`.

## Specific Subdirectories
Each subdirectory under `api` handles interactions for different types of data and includes the following two key files:
- **dataset**: Handles dataset-related API interactions.
- **event**: Manages event-related API calls.
- **instrument**: Responsible for instrument data API interactions.
- **organism**: Deals with organism-related API calls.
- **project**: Manages project-specific API interactions.
- **record**: Handles record-related API data.

Each subdirectory follows the same structure but is tailored to handle its specific type of data interactions and definitions.

### `apiService.ts`
This file provides the core functions for making HTTP requests using Axios:
- **get**: 
  - **Purpose**: Performs a GET request to the specified endpoint.
  - **Implementation**: 
    - Constructs the full URL using the base URL (`BASE_URL`) and the given endpoint.
    - Uses Axios to send a GET request to this URL.
    - Returns the response data if the request is successful.
    - Catches any errors during the request and returns the error as an `AxiosError` type.
- **post**: 
  - **Purpose**: Performs a POST request to the specified endpoint with an optional request body and parameters.
  - **Implementation**: 
    - Constructs the full URL using the base URL (`BASE_URL`) and the given endpoint.
    - Uses Axios to send a POST request to this URL with the provided body and optional parameters.
    - Sets the `Content-Type` header to `application/json`.
    - Includes optional parameters, defaulting to `{ take: 100 }`.
    - Returns the response data if the request is successful.
    - Catches any errors during the request and returns the error as an `AxiosError` type.

  
</details>

<details>
  <summary><strong>app</strong></summary>
  Contains the main application structure and pages:


***About*** Sub-folder includes:
- **Description**: Renders information about SBDI Biologging tools and its role in managing data from animal sensor systems.
- **API Details**: Provides links to the Biologging Open API and its data model.
- **Contact Information**: Offers contact details for inquiries and contributions.

***Details*** Sub-folder includes:
- **Overview**: Displays detailed information about a specific dataset and available dataset versions with download links.

</details>

<details>
  <summary><strong>assets</strong></summary>
  Contains static assets like images:

  - **images**: Directory for storing image files.
</details>

<details>
  <summary><strong>components</strong></summary>

### ***The overview of each subfolder's components, their functionalities, props, dependencies, and usage.***

## 1. `actogram` Subfolder
**Description**: This subfolder contains components dedicated to visualizing actogram data, representing activity patterns over time. 

### Actogram Component
- **Description**: Fetches actogram data and renders a graph displaying activity patterns.
- **Props**: Accepts an array of event objects (`events`).
- **Dependencies**: Utilizes React, date-fns for date manipulation, and custom API modules for data fetching.
- **Usage**: `<Actogram events={events} />`

### ActogramGraph Component
- **Description**: Renders the actogram graph based on provided data.
- **Props**: Receives data arrays (`data`), a map of month counts (`mCounts`), and the total number of days (`days`).
- **Dependencies**: Utilizes React and react-chartjs-2 for graph rendering.
- **Usage**: `<ActogramGraph data={data} mCounts={mCounts} days={days} />`

## 2. `line` Subfolder
### **Description**: Contains components for displaying line graphs.

### LineGraph Component
- **Description**: Fetches data and renders a line graph displaying sensor data over time.
- **Props**: Accepts an array of event objects (`events`) and the name of the sensor (`sensor`).
- **Dependencies**: Requires React, react-chartjs-2, and custom API modules.
- **Usage**: `<LineGraph events={events} sensor={sensor} />`

## 3. `map` Subfolder
**Description**: Houses components for displaying geographical data on maps, facilitating the visualization of spatial information.

### MapGraph Component
- **Description**: Fetches geographical data and renders a map with markers and polylines.
- **Props**: Receives an array of event objects (`events`).
- **Dependencies**: Depends on React, react-leaflet, and custom API modules for data retrieval.
- **Usage**: `<MapGraph events={events} />`

### MapComponent Component
- **Description**: Renders the Leaflet map and coordinates the rendering of markers and polylines.
- **Props**: Accepts an array of coordinate arrays (`data`).
- **Dependencies**: Utilizes React, react-leaflet, and leaflet library.
- **Usage**: `<MapComponent data={data} />`

### Polylines Component
- **Description**: Renders polylines on the map based on provided coordinate data.
- **Props**: Receives an array of coordinate arrays (`coords`).
- **Dependencies**: Requires React, react-leaflet, and leaflet library.
- **Usage**: `<Polylines coords={coords} />`


# Overview

## 1. `table.tsx` file:

### Description:
This file contains the implementation of a table component (`OverviewTable`) for displaying dataset information. It utilizes the AG Grid component for efficient rendering and management of large datasets.

### Dependencies:
- React: For building the user interface.
- ag-Grid: A feature-rich datagrid library for displaying large datasets in tabular format.
- axios: A promise-based HTTP client for making API requests.
- date-fns: A library for manipulating dates in JavaScript.

### Components:
- `OverviewTable`: Renders a table displaying dataset information with features like sorting, filtering, and row selection.

### Features:
- Error handling: Detects and displays error messages if data loading fails.
- Row selection: Allows users to select a row and trigger a callback function (`onSelect`) with the selected dataset item.
- Cell rendering: Custom rendering of certain cells, such as temporal coverage, for improved readability.
- Grid configuration: Configures default grid options and column definitions for consistent behavior and appearance.

## 2. `Snippet.tsx` file:

### Description:
This file contains the implementation of a snippet component (`OverviewSnippet`) for displaying summarized dataset information. It provides links for accessing detailed information, visualization, and dataset download.

### Dependencies:
- React: For building the user interface.
- Font Awesome: For adding icons to enhance visual representation.

### Components:
- `OverviewSnippet`: Renders a summarized view of dataset information with links for detailed information, visualization, and download.

### Features:
- Dataset overview: Displays basic information about the dataset such as title, description, instruments, and sensors.
- Links: Provides links for accessing more detailed information, visualization, and dataset download.
- Download functionality: Allows users to download the dataset in JSON format.
- Error handling: Handles cases where dataset information is unavailable or incomplete.


</details>

<details>
  <summary><strong>hooks</strong></summary>
  

## Description:
The `hooks` folder contains custom hooks and context providers used for managing sensor selection in visualizations.

## Files:

#### Description:
This file exports a custom hook `useSensorSelection` and a context provider `SensorSelectionProvider` for managing sensor selection.

#### Dependencies:
- React: For building the user interface.

#### Components/Interfaces:
- `SensorSelectionContext`: Context for managing sensor selection state.
- `useSensorSelection`: Custom hook for accessing sensor selection context.
- `SensorSelectionProvider`: Context provider component for managing sensor selection state.

#### Features:
- Context management: Provides a context and custom hook for managing sensor selection state across components.
- Sensor selection update: Allows components to update the selected sensors and trigger re-renders when sensor selection changes.


</details>


# Tech Stack and Libraries Used in this project

<details>
  <summary><strong>Tech Stack</strong></summary>

- **Frontend Framework:** React.js with TypeScript
- **Styling:** CSS (potentially with CSS-in-JS libraries)
- **Data Visualization:** react-chartjs-2 for rendering charts/graphs, react-leaflet for mapping, potentially supplemented by Leaflet library
- **State Management:** React Context API (for managing sensor selection)
- **HTTP Requests:** Axios for making API requests
- **Date Manipulation:** date-fns for handling dates
- **Grid Component:** ag-Grid for displaying large datasets efficiently in tabular format

</details>

<details>
  <summary><strong>Libraries and Dependencies</strong></summary>

- **React:** Chosen for its component-based architecture, reusability, and performance optimizations.
- **TypeScript:** Added type safety and enhanced development experience by catching errors during compile time.
- **react-chartjs-2:** Provided a simple and customizable way to render charts/graphs in React applications.
- **react-leaflet and Leaflet:** Utilized for displaying geographical data on interactive maps, offering flexibility and customization options.
- **Axios:** Used for making HTTP requests to fetch data from APIs, offering a promise-based interface and robust error handling.
- **ag-Grid:** Employed for displaying large datasets efficiently in tabular format, providing features like sorting, filtering, and row selection.
- **date-fns:** Facilitated date manipulation tasks, ensuring consistent handling of temporal data across the application.
- **CSS-in-JS Libraries (potentially):** Styled components are used for styling components, providing scoped styles and enhancing maintainability.

</details>

<details>
  <summary><strong>Reasons for Usage</strong></summary>

- **React.js with TypeScript:** The tech team (Khosiyat, Yuliia, Zuzanna) chose it because of the strong community support, and the ability to build complex UIs with ease while ensuring type safety.
- **react-chartjs-2:** The reasons for choosing this library are: 1) Integration with React. 2) Active Development and Community Support 3) Easy 4) MIT License.
[see the Decision-making process to select alternative visualization libraries](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/develop/design-docs/Decision-Making-Process-Visualization-Librarires-Document.md)
- **react-leaflet and Leaflet:** Suggested by the tech team of Lund University. During the product development process, we, the tech team, saw this library offer powerful mapping capabilities with extensive customization options, ideal for visualizing geographical data.
- **Axios:** Preferred (by Khosiyat, Yuliia, Zuzanna) for its simplicity, flexibility, and built-in support for interceptors, allowing for centralized request and response handling.
- **ag-Grid:** Suggested by Yuliia, Zuzanna for its performance optimizations, extensive feature set, and compatibility with React, making it suitable for handling large datasets efficiently.
- **date-fns:** Chosen for its lightweight nature, comprehensive date manipulation utilities, and TypeScript support, ensuring reliable handling of temporal data.
- **CSS-in-JS Libraries (potentially):** Offered a convenient way to style components with scoped styles, enhancing encapsulation and reusability.

</details>


# Summery | Technical Walkthrough

The project architecture consists of a well-organized directory structure featuring distinct folders for API interactions, **application components**, **assets**, and **custom hooks**. The `api` directory manages data-related operations with subdirectories for `datasets`, `events`, `instruments`, `organisms`, `projects`, and `records`, each with specific **API** functions and **TypeScript interfaces**. The app directory contains the main application pages, including sections for **detailed dataset information** and **visualizations**. Static assets, primarily images, are stored in the assets directory.

The components directory includes subfolders for graphs (`actogram`, `line`, and `map`) and overview components, each designed for specific data visualization and table representation purposes. Custom hooks for managing sensor selections are housed in the hooks directory.

The tech stack leverages **React.js** with **TypeScript** for the frontend, supported by libraries like **react-chartjs-2** for **charts**__, **react-leaflet** for **maps**__, **Axios** for **HTTP requests**__, **date-fns** for **date handling**__, and **ag-Grid** for efficient **data tables**__. The chosen libraries ensure robust, type-safe, and efficient handling of complex data visualization and interactions.
