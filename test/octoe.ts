import {Model, player_o, player_x} from "./octoe.pflow";
import {Role} from "../src/pflow";

export class Octoe {
    private state: Array<number>

    public player_x: Role = player_x
    public player_o: Role = player_o

    constructor(state?: Array<number>) {
        let _ = Model // dummy import makes IDE happy
        if (state) {
            this.state = state
        } else {
            // TODO: build from Model
            this.state = Model.initial_state()
        }
    }

    turn_o (): boolean {
        return false
    }

    turn_x (): boolean {
        // FIXME check state value
        return true
    }

    move(action: string): boolean {
        return true
    }

    available_moves(role: Role): Array<string> {
        return ['11']
    }

    check_for_wins() {
    }

    is_over (): boolean {
        return false
    }
}
