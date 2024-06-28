# Actogram
Located in "src/components/graphs/actogram". 

## Actogram rendering
To visualize the actogram, it is drawn on the `<canvas>`. This means that every square of the actogram has its specific (x, y) position. 

In **Actogram.tsx**, data is prepared by putting records for fetched event into appropriate structure. The structure includes x coordinate, y coordinate and the score for the recorded value. 

In **ActogramGraph.tsx**, the graph is rendered by systematically rendering data on the canvas. 

**ActogramLegend.tsx** display legend to the actogram.

### Calculating X position
X position is determined by the full hour of the entry, each square representing different hour. 

### Calculating Y position
Y position is calculated for each record to be categorized in the day. So the Y position is calculated as the current day multiplied by the size of the square.

### Sizing and positioning
For playing with styles and positioning, file "src/components/graphs/actogram/constants.ts" contains important sizings and offsets. 


### Data in config file
Some configuration can be done using config file. Configurable items are:
- color of the graph,
- not measure value and its color,
- error measured value and its color
