import { expect } from "chai";
import {
    ErrorBadArcPlace, ErrorBadArcTransition,
    ErrorBadArcWeight, ErrorBadGuardSource,
    ErrorBadInhibitorSource,
    ErrorBadInhibitorTarget,
    Pflow
} from "../src/pflow"

let p = new Pflow() // keep a short varname for convenience
p.schema('counter')
let user = p.role("testUser")
let p00 = p.place({ label: '00', initial: 1 })
let p01 = p.place({ label: '01', initial: 1 })
let p02 = p.place({ label: '02', initial: 1 })

let x00 = p.transition({ label: 'x00'})
p02.inhibit(1, x00)

describe("Pflow",()=> {
    it("should construct Vector Addition System w/ State (VASS)",() => {
        expect(p00.isTransition()).to.be.false
        expect(p00.isPlace()).to.be.true
        expect(p.initial_state()).to.eql([1,1,1])
        expect(p.empty_vector()).to.eql([0,0,0])
    })
    it("should prohibit invalid DSL usage", () => {
        expect(() => {
            p02.inhibit(1, p00)
        }).to.throw(ErrorBadInhibitorTarget)

        expect(() => {
            x00.inhibit(1, x00)
        }).to.throw(ErrorBadInhibitorSource)

        expect(() => {
            x00.arc(-1, p00)
        }).to.throw(ErrorBadArcWeight)

        expect(() => {
            p01.arc(1, p00)
        }).to.throw(ErrorBadArcPlace)

        expect(() => {
            x00.arc(1, x00)
        }).to.throw(ErrorBadArcTransition)

        expect(() => {
            p00.guard(user)
        }).to.throw(ErrorBadGuardSource)
    })
})
