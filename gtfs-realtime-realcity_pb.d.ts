// package: realcity
// file: gtfs-realtime-realcity.proto

import * as jspb from "google-protobuf";
import * as gtfs_realtime_pb from "./gtfs-realtime_pb";

export class VehicleDescriptor extends jspb.Message {
  hasVehicleModel(): boolean;
  clearVehicleModel(): void;
  getVehicleModel(): string | undefined;
  setVehicleModel(value: string): void;

  hasDeviated(): boolean;
  clearDeviated(): void;
  getDeviated(): boolean | undefined;
  setDeviated(value: boolean): void;

  hasVehicleType(): boolean;
  clearVehicleType(): void;
  getVehicleType(): number | undefined;
  setVehicleType(value: number): void;

  hasDoorOpen(): boolean;
  clearDoorOpen(): void;
  getDoorOpen(): boolean | undefined;
  setDoorOpen(value: boolean): void;

  hasStopDistance(): boolean;
  clearStopDistance(): void;
  getStopDistance(): number | undefined;
  setStopDistance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehicleDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: VehicleDescriptor): VehicleDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VehicleDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehicleDescriptor;
  static deserializeBinaryFromReader(message: VehicleDescriptor, reader: jspb.BinaryReader): VehicleDescriptor;
}

export namespace VehicleDescriptor {
  export type AsObject = {
    vehicleModel?: string,
    deviated?: boolean,
    vehicleType?: number,
    doorOpen?: boolean,
    stopDistance?: number,
  }
}

export class StopTimeUpdate extends jspb.Message {
  hasScheduledArrival(): boolean;
  clearScheduledArrival(): void;
  getScheduledArrival(): gtfs_realtime_pb.TripUpdate.StopTimeEvent | undefined;
  setScheduledArrival(value?: gtfs_realtime_pb.TripUpdate.StopTimeEvent): void;

  hasScheduledDeparture(): boolean;
  clearScheduledDeparture(): void;
  getScheduledDeparture(): gtfs_realtime_pb.TripUpdate.StopTimeEvent | undefined;
  setScheduledDeparture(value?: gtfs_realtime_pb.TripUpdate.StopTimeEvent): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopTimeUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: StopTimeUpdate): StopTimeUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopTimeUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopTimeUpdate;
  static deserializeBinaryFromReader(message: StopTimeUpdate, reader: jspb.BinaryReader): StopTimeUpdate;
}

export namespace StopTimeUpdate {
  export type AsObject = {
    scheduledArrival?: gtfs_realtime_pb.TripUpdate.StopTimeEvent.AsObject,
    scheduledDeparture?: gtfs_realtime_pb.TripUpdate.StopTimeEvent.AsObject,
  }
}

export class RouteDetail extends jspb.Message {
  hasRouteId(): boolean;
  clearRouteId(): void;
  getRouteId(): string | undefined;
  setRouteId(value: string): void;

  hasHeaderText(): boolean;
  clearHeaderText(): void;
  getHeaderText(): gtfs_realtime_pb.TranslatedString | undefined;
  setHeaderText(value?: gtfs_realtime_pb.TranslatedString): void;

  hasCause(): boolean;
  clearCause(): void;
  getCause(): gtfs_realtime_pb.Alert.CauseMap[keyof gtfs_realtime_pb.Alert.CauseMap] | undefined;
  setCause(value: gtfs_realtime_pb.Alert.CauseMap[keyof gtfs_realtime_pb.Alert.CauseMap]): void;

  hasEffect(): boolean;
  clearEffect(): void;
  getEffect(): gtfs_realtime_pb.Alert.EffectMap[keyof gtfs_realtime_pb.Alert.EffectMap] | undefined;
  setEffect(value: gtfs_realtime_pb.Alert.EffectMap[keyof gtfs_realtime_pb.Alert.EffectMap]): void;

  hasEffectType(): boolean;
  clearEffectType(): void;
  getEffectType(): RouteDetail.EffectTypeMap[keyof RouteDetail.EffectTypeMap] | undefined;
  setEffectType(value: RouteDetail.EffectTypeMap[keyof RouteDetail.EffectTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RouteDetail.AsObject;
  static toObject(includeInstance: boolean, msg: RouteDetail): RouteDetail.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RouteDetail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RouteDetail;
  static deserializeBinaryFromReader(message: RouteDetail, reader: jspb.BinaryReader): RouteDetail;
}

export namespace RouteDetail {
  export type AsObject = {
    routeId?: string,
    headerText?: gtfs_realtime_pb.TranslatedString.AsObject,
    cause?: gtfs_realtime_pb.Alert.CauseMap[keyof gtfs_realtime_pb.Alert.CauseMap],
    effect?: gtfs_realtime_pb.Alert.EffectMap[keyof gtfs_realtime_pb.Alert.EffectMap],
    effectType?: RouteDetail.EffectTypeMap[keyof RouteDetail.EffectTypeMap],
  }

  export interface EffectTypeMap {
    NO_SERVICE: 1;
    WARNING: 2;
  }

  export const EffectType: EffectTypeMap;
}

export class Alert extends jspb.Message {
  hasStarttext(): boolean;
  clearStarttext(): void;
  getStarttext(): gtfs_realtime_pb.TranslatedString | undefined;
  setStarttext(value?: gtfs_realtime_pb.TranslatedString): void;

  hasEndtext(): boolean;
  clearEndtext(): void;
  getEndtext(): gtfs_realtime_pb.TranslatedString | undefined;
  setEndtext(value?: gtfs_realtime_pb.TranslatedString): void;

  hasModifiedtime(): boolean;
  clearModifiedtime(): void;
  getModifiedtime(): number | undefined;
  setModifiedtime(value: number): void;

  clearRouteList(): void;
  getRouteList(): Array<RouteDetail>;
  setRouteList(value: Array<RouteDetail>): void;
  addRoute(value?: RouteDetail, index?: number): RouteDetail;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Alert.AsObject;
  static toObject(includeInstance: boolean, msg: Alert): Alert.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Alert, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Alert;
  static deserializeBinaryFromReader(message: Alert, reader: jspb.BinaryReader): Alert;
}

export namespace Alert {
  export type AsObject = {
    starttext?: gtfs_realtime_pb.TranslatedString.AsObject,
    endtext?: gtfs_realtime_pb.TranslatedString.AsObject,
    modifiedtime?: number,
    routeList: Array<RouteDetail.AsObject>,
  }
}

  export const vehicle: jspb.ExtensionFieldInfo<VehicleDescriptor>;

  export const stopTimeUpdate: jspb.ExtensionFieldInfo<StopTimeUpdate>;

  export const alert: jspb.ExtensionFieldInfo<Alert>;

