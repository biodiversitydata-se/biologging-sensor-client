# Actogram
Located in "src/graph/actogram". 

## Actogram rendering
To visualize the actogram, it is drawn on the `<canvas>`. This means that every square of the actogram has its specific (x, y) position. 

In **Actogram.tsx**, data is prepared by putting records for fetched event into appropriate structure. The structure includes x coordinate, y coordinate and the score for the recorded value. 

### Calculating X position

### Calculating Y position

### Sizing and positioning of the actogram

### Data in config file
Some configuration can be done using config file. Configurable items are:
- color of the graph,
- not measure value and its color,
- error measured value and its color



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