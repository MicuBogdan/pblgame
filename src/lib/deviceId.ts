import { v4 as uuidv4 } from "uuid";

const DEVICE_ID_KEY = "bplgame_device_id";

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
}

export function getDeviceId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(DEVICE_ID_KEY) || null;
}
