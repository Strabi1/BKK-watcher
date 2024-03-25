
import * as vscode from 'vscode';
import * as protobuf from 'protobufjs';
import * as fs from 'fs';
import * as path from 'path';
import { FeedMessage } from './gtfs-realtime_pb';

// const protobufjs = require("protobufjs")

export function activate(context: vscode.ExtensionContext) {

	const folder = vscode.workspace.workspaceFolders![0].uri.fsPath;
	const fileName = path.join(folder, "bus.pb");
	const protoFile = path.join(folder, "gtfs-realtime.proto");
	const routeId = '1340';				// Bus 134
    const stopId = 'F00495';			// Huba street
	
	
	context.subscriptions.push(
		vscode.commands.registerCommand('bkkwatcher.watch', async() => {
			vscode.window.showInformationMessage('Hello World from BKK Watcher!');
			const tripUpdates = await loadTripUpdates(fileName);
		
			// const departureTimes = findDepartureTimes(tripUpdates, routeId, stopId);
			// console.log(`Departure times for route ${routeId} and stop ${stopId}:`, departureTimes);
		})
	)

	async function loadTripUpdates(filename: string): Promise<FeedMessage /* | unknown */>  {
		const buffer = fs.readFileSync(filename);
		const root = await protobuf.load(protoFile); // Update this path

		console.log(JSON.stringify(root.toJSON(), null, 4));
		
		
		const FeedMessage = root.lookupType("transit_realtime.FeedMessage");

		console.log(JSON.stringify(FeedMessage.toJSON(), null, 4));
		fs.writeFileSync(path.join(folder, 'buszok.json'), JSON.stringify(FeedMessage.toJSON(), null, 4));
		

		const message = FeedMessage.decode(buffer) as unknown as FeedMessage;

		const dd = message.toArray();

		return message;

		// const buffer = fs.readFileSync(filename);
    	// return FeedMessage.deserializeBinary(buffer);
	}

	function findDepartureTimes(feedMessage: FeedMessage, routeId: string, stopId: string): string[] {
		const departureTimes: string[] = [];
	
		feedMessage.toObject().entityList.forEach(entity => {
			// if (entity.getTripUpdate() && entity.getTripUpdate()?.getTrip().getRouteId() === routeId) {
			// 	entity.getTripUpdate()?.getStopTimeUpdateList().forEach(update => {
			// 		if (update.getStopId() === stopId) {
			// 			departureTimes.push(update.getDeparture()?.getTime()?.toString() || 'Unknown time');
			// 		}
			// 	});
			// }
		});
	
		return departureTimes;
	}

}

export function deactivate() {}
