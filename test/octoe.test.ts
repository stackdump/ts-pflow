import { expect } from "chai";
import {Pflow, Place} from "../src/pflow"


describe("Pflow", () => {
    it("should be able to define tic-tac-toe moves", () => {
        let p = new Pflow()
        p.schema('octoe')

        let player_x = p.role("player_x")
        let player_o = p.role("player_o")

        // Board
        let p00 = p.place({ label: '00', initial: 1 })
        let p01 = p.place({ label: '01', initial: 1 })
        let p02 = p.place({ label: '02', initial: 1 })

        let p10 = p.place({ label: '10', initial: 1 })
        let p11 = p.place({ label: '11', initial: 1 })
        let p12 = p.place({ label: '12', initial: 1 })

        let p20 = p.place({ label: '20', initial: 1 })
        let p21 = p.place({ label: '21', initial: 1 })
        let p22 = p.place({ label: '22', initial: 1 })

        // track alternating turns
        let turn_x = p.place({ label: 'turn_x', initial: 1 })
        let turn_o = p.place({ label: 'turn_o', initial: 0 })

        // player X moves
        let x00 = p.transition({label: 'x00'}).guard(player_x).arc(1, turn_o)
        let x01 = p.transition({label: 'x01'}).guard(player_x).arc(1, turn_o)
        let x02 = p.transition({label: 'x02'}).guard(player_x).arc(1, turn_o)

        let x10 = p.transition({label: 'x10'}).guard(player_x).arc(1, turn_o)
        let x11 = p.transition({label: 'x11'}).guard(player_x).arc(1, turn_o)
        let x12 = p.transition({label: 'x12'}).guard(player_x).arc(1, turn_o)

        let x20 = p.transition({label: 'x20'}).guard(player_x).arc(1, turn_o)
        let x21 = p.transition({label: 'x21'}).guard(player_x).arc(1, turn_o)
        let x22 = p.transition({label: 'x22'}).guard(player_x).arc(1, turn_o)

        // player O moves
        let o00 = p.transition({label: 'o00'}).guard(player_o).arc(1, turn_x)
        let o01 = p.transition({label: 'o01'}).guard(player_o).arc(1, turn_x)
        let o02 = p.transition({label: 'o02'}).guard(player_o).arc(1, turn_x)

        let o10 = p.transition({label: 'o10'}).guard(player_o).arc(1, turn_x)
        let o11 = p.transition({label: 'o11'}).guard(player_o).arc(1, turn_x)
        let o12 = p.transition({label: 'o12'}).guard(player_o).arc(1, turn_x)

        let o20 = p.transition({label: 'o20'}).guard(player_o).arc(1, turn_x)
        let o21 = p.transition({label: 'o21'}).guard(player_o).arc(1, turn_x)
        let o22 = p.transition({label: 'o22'}).guard(player_o).arc(1, turn_x)

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

    });
});

