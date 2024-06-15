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