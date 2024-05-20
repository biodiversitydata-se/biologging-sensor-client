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
    to: number;
    color: string;
    label: string;

    constructor(from: number, to: number, color: string, label: string) {
        this.from = from;
        this.to = to;
        this.color = color;
        this.label = label;
    }

}

export class Actogram extends SensorType {
    config: ActogramConfig[];

    constructor(type: GraphType, valuesMeasured: string[], config: ActogramConfig[]) {
        super(type, valuesMeasured);
        this.config = config;
    }
}

export class Map extends SensorType {
    constructor(type: GraphType, valuesMeasured: string[], units?: string) {
        super(type, valuesMeasured, units);
    }
} 

export class LineGraph extends SensorType {
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

    constructor(sensorTypes: string[]) {
        this.sensorTypes = sensorTypes;
    }
}