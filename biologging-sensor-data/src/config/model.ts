export type GraphType = 'A' | 'L' | 'M' | 'N';

export class ConfigItem {
    valuesMeasured: string[];
    graphType: GraphType;
    graph: LineGraphC|ActogramC|MapC|NoVisC;

    get lineGraphC(): LineGraphC {
        return this.graph as LineGraphC;
    }

    get actogramC(): ActogramC {
        return this.graph as ActogramC;
    }

    get mapC(): MapC {
        return this.graph as MapC;
    }

    get noVisC(): NoVisC {
        return this.graph as NoVisC;
    }

    constructor(valuesMeasured: string[], graphType: GraphType, graph: LineGraphC|ActogramC|MapC) {
        this.valuesMeasured = valuesMeasured;
        this.graphType = graphType;
        this.graph = graph;
    }
}

export class ActogramConfig {
    from: number;
    to?: number;
    color: string;
    label: string;

    constructor(color: string, label: string, from: number, to?: number) {
        this.from = from;
        this.to = to;
        this.color = color;
        this.label = label;
    }

}

export class ActogramC {
    config: ActogramConfig[];

    constructor(config: ActogramConfig[]) {
        this.config = config;
    }
}

export class MapC {
    constructor() {
    }
} 

export class NoVisC {
    constructor() {
    }
} 

export class LineGraphC {
    x?: string;
    y?: string;

    constructor(x?: AcceptedXUnits, y?: string) {
        this.x = x;
        this.y = y;
    }
}

export class DatasetConfig {
    defaultSensors?: string[];
    customGraphs?: {[id: string]: ConfigItem};

    constructor(defaultSensors: string[], customGraphs?: {[id: string]: ConfigItem} ) {
        this.defaultSensors = defaultSensors;
        this.customGraphs = customGraphs;
    }
}

/**
 * Accepted units for X axis for line graph.
 * 
 * Source: https://www.chartjs.org/docs/latest/axes/cartesian/time.html#display-formats
 */
export enum AcceptedXUnits {
    Miliseconds = 'millisecond',
    Seconds = 'second',
    Minutes = 'minute',
    Hours = 'hour',
    Days = 'day',
    Week = 'week',
    Month = 'month',
    Quarter = 'quarter',
    Year = 'year'
}

