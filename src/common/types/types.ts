export interface SensorData {
  umidade: number;
  temperatura: number;
  relay_on: boolean;
  proximity: boolean;
  device_id?: string;
}
