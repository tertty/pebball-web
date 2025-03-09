export interface WSEvent {
    event: 16 | 17 | 18 | 19 | 20 | 21 | number,
    ackd_event?: 17 | 18 | 19 | number,
    wrist_position?: "L" | "R" | string,
    pitch_reach_time?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | number,
    swing_epoch?: Date | number
    id?: string
}