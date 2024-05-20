import { Actogram, ActogramConfig } from "./model";

// DEFAULT ACTOGRAM CONFIG
const aData: ActogramConfig[] = [];
aData.push(new ActogramConfig(0, 0, "#FFFFFF", ""));
aData.push(new ActogramConfig(0, 0, "#66FF66", ""));
aData.push(new ActogramConfig(0, 0, "#33FF33", ""));
aData.push(new ActogramConfig(0, 0, "#00CC00", ""));
aData.push(new ActogramConfig(0, 0, "#009900", ""));
aData.push(new ActogramConfig(0, 0, "#006600", ""));
aData.push(new ActogramConfig(0, 0, "#660066", ""));
aData.push(new ActogramConfig(0, 0, "black", ""));


const actogram = new Actogram('A', ['activity'], aData)