
type NodeType = {
    place?: Place,
    transition?: Transition,
}

class Node {
    private node: NodeType;

    constructor(def: any) {
        this.node = def
    }

    isPlace(): boolean {
        if ( this.node.place ) {
            return true;
        } else {
            return false;
        }
    }

    isTransition(): boolean {
        if ( this.node.transition ) {
            return true;
        } else {
            return false;
        }
    }

    inhibit($: number, target: Node) {
        if (!this.isPlace()) {
            throw new Error("inhibitor source must be a place")
        }
        if (!target.isTransition()) {
            throw new Error("inhibitor target must be a transitions")
        }
        // TODO: actually add the inhibitor
        return this
    }

    arc($: number, target: Node) {
        if ($ <= 0) {
            throw new Error("arc weight must be positive int")
        }
        if (this.isPlace() && target.isPlace()) {
            throw new Error("source and target are both places")
        }
        if (this.isTransition() && target.isTransition()) {
            throw new Error("source and target are both transitions")
        }
        // TODO: actually add the arc
        return this
    }

    // TODO: should we allow for a callback here?
    // would this be a typescript interface
    guard(def: Role) {
        if (! this.isTransition()) {
            throw new Error("guards can only be applied to a transition")
        }
        // TODO: add callback checks
        return this
    }

}

export class Pflow {
    private net: any;

    constructor() {
        this.net = {
            roles: new Map<string, number>(),
            places: new Map<string, Place>(),
            transitions: new Map<string, Transition>(),
        };
    }

    schema(name: string) {
        this.net.schema = name;
    }

    role(def: string): Role {
        return {label: def}
    }

    place(def: Place) {
        this.net.places[def.label] = def
        // REVIEW: add DSL helpers
        return new Node({place: def})
    }

    transition(def: Transition) {
        this.net.transitions[def.label] = def
        return new Node({transition: def})
    }
}

export type Role = {
    label: string,
}

export type Action = {
    action: string,
    multiple: number,
}
export type Command = {
    id: string,
    schema: string,
    chain: string,
    action: Array<Action>,
    state: Array<number>,
}
export type State = {
    id: string,
    schema: string,
    chain: string,
    state: Array<number>,
    head: string,
    //created?: Timestamp,
    //updated?: google_protobuf_timestamp_pb.Timestamp.AsObject,
}
export type EventStatus = {
    state: State,
    code: number,
    message: string,
}
export type Event = {
    id: string,
    schema: string,
    chain: string,
    action: Array<Action>,
    //payload: Any, REVIEW: how do you do this?
    state: Array<number>,
    uuid: string,
    parent: string,
}
export type Guard = {
    label: string,
    delta: Array<number>,
}
export type Transition = {
    label: string,
    role?: Role,
    delta?: Array<number>,
    guards?: Array<[string, Guard]>,
}
export type Place = {
    label: string,
    offset?: number,
    initial?: number,
    capacity?: number,
}

export type Machine = {
    schema: string,
    initial: Array<number>,
    capacity: Array<number>,
    transitions: Array<[string, Transition]>,
}
