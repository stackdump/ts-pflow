import { expect } from "chai";
import {Octoe} from "./octoe";

describe("Octoe", () => {
    it("should be able to play tic-tac-toe", () => {
        let game = new Octoe()
        expect(game.turn_o()).to.be.false
        expect(game.turn_x()).to.be.true
        expect(game.is_over()).to.be.false
        expect(game.available_moves(game.player_x)).to.include('11')
        expect(game.move('11')).to.be.true
    });

    it("should allow user to provide input state", () => {
        let game = new Octoe([1,2,3]) // KLUDGE: this is an invalid start state
    });
});

