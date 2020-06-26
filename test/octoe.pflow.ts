import {Pflow} from "../src/pflow"

// Fun Fact: Octothorpe is another name for '#' symbol
// so we use a playful name of our version of tic-tac-toe :-P
const p = new Pflow('octoe')
export const Model = p

// Roles
export const player_x = p.role("player_x")
export const player_o = p.role("player_o")

// Board
const p00 = p.place({ label: '00', initial: 1 })
const p01 = p.place({ label: '01', initial: 1 })
const p02 = p.place({ label: '02', initial: 1 })

const p10 = p.place({ label: '10', initial: 1 })
const p11 = p.place({ label: '11', initial: 1 })
const p12 = p.place({ label: '12', initial: 1 })

const p20 = p.place({ label: '20', initial: 1 })
const p21 = p.place({ label: '21', initial: 1 })
const p22 = p.place({ label: '22', initial: 1 })

// track alternating turns
const turn_x = p.place({ label: 'turn_x', initial: 1 })
const turn_o = p.place({ label: 'turn_o', initial: 0 })

// player X moves
const x00 = p.transition({label: 'x00', role: player_x}).arc(1, turn_o)
const x01 = p.transition({label: 'x01', role: player_x}).arc(1, turn_o)
const x02 = p.transition({label: 'x02', role: player_x}).arc(1, turn_o)

const x10 = p.transition({label: 'x10', role: player_x}).arc(1, turn_o)
const x11 = p.transition({label: 'x11', role: player_x}).arc(1, turn_o)
const x12 = p.transition({label: 'x12', role: player_x}).arc(1, turn_o)

const x20 = p.transition({label: 'x20', role: player_x}).arc(1, turn_o)
const x21 = p.transition({label: 'x21', role: player_x}).arc(1, turn_o)
const x22 = p.transition({label: 'x22', role: player_x}).arc(1, turn_o)

// player O moves
const o00 = p.transition({label: 'o00', role: player_o}).arc(1, turn_x)
const o01 = p.transition({label: 'o01', role: player_o}).arc(1, turn_x)
const o02 = p.transition({label: 'o02', role: player_o}).arc(1, turn_x)

const o10 = p.transition({label: 'o10', role: player_o}).arc(1, turn_x)
const o11 = p.transition({label: 'o11', role: player_o}).arc(1, turn_x)
const o12 = p.transition({label: 'o12', role: player_o}).arc(1, turn_x)

const o20 = p.transition({label: 'o20', role: player_o}).arc(1, turn_x)
const o21 = p.transition({label: 'o21', role: player_o}).arc(1, turn_x)
const o22 = p.transition({label: 'o22', role: player_o}).arc(1, turn_x)

// change turns when player_x moves
turn_x.arc(1, x00)
turn_x.arc(1, x01)
turn_x.arc(1, x02)

turn_x.arc(1, x10)
turn_x.arc(1, x11)
turn_x.arc(1, x12)

turn_x.arc(1, x20)
turn_x.arc(1, x21)
turn_x.arc(1, x22)

// remove token from board when player_x moves
p00.arc(1, x00)
p01.arc(1, x01)
p02.arc(1, x02)

p10.arc(1, x10)
p11.arc(1, x11)
p12.arc(1, x12)

p20.arc(1, x20)
p21.arc(1, x21)
p22.arc(1, x22)

// remove token from board when player_o moves
p00.arc(1, o00)
p01.arc(1, o01)
p02.arc(1, o02)

p10.arc(1, o10)
p11.arc(1, o11)
p12.arc(1, o12)

p20.arc(1, o20)
p21.arc(1, o21)
p22.arc(1, o22)

// change turns when player_o moves
turn_o.arc(1, o00)
turn_o.arc(1, o01)
turn_o.arc(1, o02)

turn_o.arc(1, o10)
turn_o.arc(1, o11)
turn_o.arc(1, o12)

turn_o.arc(1, o20)
turn_o.arc(1, o21)
turn_o.arc(1, o22)

Model.freeze()
