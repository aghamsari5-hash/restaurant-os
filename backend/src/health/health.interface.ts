export interface HealthStatusResponse {
  readonly status: string;
  readonly database: string;
  readonly redis: string;
  readonly version: string;
  readonly uptime: number;
}
