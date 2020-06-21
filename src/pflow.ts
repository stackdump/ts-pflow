type NodeType = {
    place?: Place,
    transition?: Transition,
}


// Domain Specific Language (DSL) validation errors
export const ErrorBadInhibitorSource: Error = new Error("inhibitor source must be a place")
export const ErrorBadInhibitorTarget: Error = new Error("inhibitor target must be a transitions")
export const ErrorBadArcWeight: Error = new Error("arc weight must be positive int")
export const ErrorBadArcTransition: Error = new Error("source and target are both transitions")
export const ErrorBadArcPlace: Error = new Error("source and target are both places")
export const ErrorBadGuardSource: Error = new Error("guards can only be applied to a transition")

// The term 'Node' here refers to the nodes of a digraph
// https://en.wikipedia.org/wiki/Directed_graph
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
            throw ErrorBadInhibitorSource
        }
        if (!target.isTransition()) {
            throw ErrorBadInhibitorTarget
        }
        // TODO: actually add the inhibitor
        return this
    }

    arc($: number, target: Node) {
        if ($ <= 0) {
            throw ErrorBadArcWeight
        }
        if (this.isPlace() && target.isPlace()) {
            throw ErrorBadArcPlace
        }
        if (this.isTransition() && target.isTransition()) {
            throw ErrorBadArcTransition
        }
        // TODO: actually add the arc
        return this
    }

    // TODO: should we allow for a callback here?
    // would this be a typescript interface
    guard(def: Role) {
        if (! this.isTransition()) {
            throw ErrorBadGuardSource
        }
        // TODO: add callback checks
        return this
    }

}

type Net = {
    schema: string
    roles: Map<string, number>
    places: Map<string, Place>
    transitions: Map<string, Transition>
}

export class Pflow {
    private net: Net; // store pflow data

    constructor() {
        this.net = {
            schema: "",
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
        def.offset = this.net.places.size
        this.net.places.set(def.label, def)
        return new Node({place: def})
    }

    transition(def: Transition) {
        this.net.transitions.set(def.label, def)
        return new Node({transition: def})
    }

    empty_vector(): Array<number> {
        let out: Array<number> = []
        this.net.places.forEach( () => { out.push(0) })
        return out
    }

    initial_state(): Array<number> {
        let out: Array<number> = []
        this.net.places.forEach((pl: Place, key: string) => {
            out[pl.offset] = pl.initial
        })
        return out
    }
}

export type Role = {
    label: string
}

export type Guard = {
    label: string
    delta: Array<number>
}
export type Transition = {
    label: string
    role?: Role
    delta?: Array<number>
    guards?: Array<[string, Guard]>
}
export type Place = {
    label: string
    offset?: number
    initial?: number
    capacity?: number
}
