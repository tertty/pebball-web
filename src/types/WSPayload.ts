export interface WSPayload {
    client?: 'pebble' | 'gui' | string,
    msg: string
}