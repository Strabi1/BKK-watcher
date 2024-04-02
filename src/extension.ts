
import * as vscode from 'vscode';
import axios from 'axios';
import * as protobuf from 'protobufjs';
import * as path from 'path';

import {apiKey} from './apiKey';

type FeedMessage = {
	header: any,
	entity: Array<FeedEntity>,
}

type FeedEntity = {
	id?: string,
	isDeleted?: boolean,
	tripUpdate?: TripUpdate,
	vehicle?: any,
	alert?: any,
}

type TripUpdate = {
	trip: TripDescriptor,
	vehicle?: any,
	stopTimeUpdate: Array<StopTimeUpdate>,
	timestamp?: number,
	delay?: number,
	tripProperties?: TripProperties,
}

type StopTimeUpdate = {
	stopSequence?: number,
	stopId?: string,
	arrival?: StopTimeEvent,
	departure?: StopTimeEvent,
	scheduleRelationship?: any,
	stopTimeProperties?: any,
}

type StopTimeEvent = {
	delay?: number,
	time?: number,
	uncertainty?: number,
}

type TripDescriptor = {
	tripId?: string,
	routeId?: string,
	directionId?: number,
	startTime?: string,
	startDate?: string,
	scheduleRelationship?: any,
}

type TripProperties = {
	tripId?: string,
	startDate?: string,
	startTime?: string,
}

const url = `https://go.bkk.hu/api/query/v1/ws/gtfs-rt/full/TripUpdates.pb?key=${apiKey}`;

const routeId = '1340';             // Bus 134
const stopId = 'F00496';            // Huba street

let protoFile: string;
let isEnabled: boolean = true;
const maxTripCount = 3;

export function activate(context: vscode.ExtensionContext) {
	protoFile = path.join(__dirname, '..', 'resources', 'gtfs-realtime.proto');

	let tripsLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2);
		tripsLabel.text =  '134 Huba street';
		tripsLabel.tooltip = 'Bus 134, Huba street';
		tripsLabel.show();
		context.subscriptions.push(tripsLabel);

		const modifyTripsLabel = async () => {
			const trips = await readAndProcessTrips();
			if(trips.length)
			tripsLabel.text = trips;
	}
	
	modifyTripsLabel();
	
	let interval = setInterval(modifyTripsLabel, 15000);

    context.subscriptions.push(new vscode.Disposable(() => clearInterval(interval)));

	context.subscriptions.push(
		vscode.commands.registerCommand('bkkwatcher.enable', async () => {
			if(!isEnabled) {
				modifyTripsLabel();
				interval = setInterval(modifyTripsLabel, 15000);
				isEnabled = true;
			}	
		}),
		vscode.commands.registerCommand('bkkwatcher.disable', async () => {
			if(isEnabled) {
				tripsLabel.text =  '134 Huba street';
				clearInterval(interval);
				isEnabled = false;
			}	
		})
	);
}

export function deactivate() {}

async function readAndProcessTrips(): Promise<string> {
	const message = await readTrips();

	if(message == undefined)
		return String();

	const times = sortTrips(message);
	const timesStr = createTimeString(times);
	
	console.log(timesStr);

	return timesStr;
}

async function readTrips(): Promise<FeedMessage | undefined> {
	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' });
		const buffer = response.data;

		const root = await protobuf.load(protoFile);
		const FeedMessage = root.lookupType("transit_realtime.FeedMessage");

		const message = FeedMessage.decode(buffer) as any as FeedMessage;

		return message;
	} catch(err: any) {
		console.log(`bkk api read error. Errorcode: ${err}`);
		return undefined;
	}
}

function sortTrips(message: FeedMessage): number[] {
	let times: number[] = [];

	if (message.entity) {
		message.entity.forEach((entity: FeedEntity) => {
			if(entity?.tripUpdate?.trip?.routeId == routeId) {
				entity?.tripUpdate?.stopTimeUpdate.forEach((stopTime: StopTimeUpdate) => {
					if(stopTime.stopId == stopId) {
						if(stopTime.departure?.time != undefined) {
							const time = stopTime.departure.time;
							times.push(time);
						}
					}
				});
			}
		});

		if(times.length)
			times.sort();
	}

	return times;
}

function createTimeString(times: number[]): string {
	if(!times.length)
		return String();

	let timesStr = "";
	let cnt = 0;

	times.forEach(time  => {
		const date = new Date(time*1000);
		const now = new Date();

		const diff = date.getTime() - now.getTime();
		const diffDate = new Date(diff);
		diffDate.getTimezoneOffset()
		let diffStr: string = '';

		if(cnt >= maxTripCount || diff < -30 * 1000)
			return;

		++cnt;

		if(diff < 0)
			diffStr = 'now';
		else {
			if(diffDate.getHours() + diffDate.getTimezoneOffset()/60)
				diffStr = (diffDate.getHours()+diffDate.getTimezoneOffset()/60).toString().padStart(2, '0')+ ':';

			diffStr += diffDate.getMinutes().toString().padStart(2, '0')
				+ ':' + diffDate.getSeconds().toString().padStart(2, '0');
		}

		const timeStr = date.getHours().toString().padStart(2, '0')
			+ ':' + date.getMinutes().toString().padStart(2, '0')
			+ ':' + date.getSeconds().toString().padStart(2, '0')
			+ ' (' + diffStr + ')';

		// console.log(timeStr);
		timesStr += timeStr + '  ';
	})

	return timesStr;
}
