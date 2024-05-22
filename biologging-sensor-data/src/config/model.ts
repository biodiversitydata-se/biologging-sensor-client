export type GraphType = 'A' | 'L' | 'M';

export class SensorType {
    type: GraphType;
    valuesMeasured: string[];
    units?: string; 

    constructor(type: GraphType, valuesMeasured: string[], units?: string) {
        this.type = type;
        this.units = units;
        this.valuesMeasured = valuesMeasured;
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

export class ActogramC extends SensorType {
    config: ActogramConfig[];

    constructor(type: GraphType, valuesMeasured: string[], config: ActogramConfig[]) {
        super(type, valuesMeasured);
        this.config = config;
    }
}

export class MapC extends SensorType {
    constructor(type: GraphType, valuesMeasured: string[], units?: string) {
        super(type, valuesMeasured, units);
    }
} 

export class LineGraphC extends SensorType {
    x?: string;
    y?: string;

    constructor(type: GraphType, valuesMeasured: string[], x?: string, y?: string, units?: string) {
        super(type, valuesMeasured, units);
        this.x = x;
        this.y = y;
    }
}

export class DatasetConfig {
    sensorTypes: string[];
    customGraphs?: SensorType[];

    constructor(sensorTypes: string[], customGraphs?: SensorType[]) {
        this.sensorTypes = sensorTypes;
        this.customGraphs = customGraphs;
    }
}