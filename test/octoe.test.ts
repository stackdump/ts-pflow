import { expect } from "chai"
import { Octoe} from "./octoe"
import { Model } from "./octoe.pflow"
import {ErrorFrozenModel, ErrorInvalidOutput} from "../src/pflow"

describe("Octoe", () => {
    it("should be able to play tic-tac-toe", () => {
        const game = new Octoe()
        expect(game.isTurnO()).to.be.false
        expect(game.isTurnX()).to.be.true
        expect(game.isOver()).to.be.false
        expect(game.availableMoves(game.player_x)).to.include('x11')

        const [err1, out1, role1] = game.move('x11')
        expect(err1).to.be.null
        expect(out1).to.eql([1,1,1,1,0,1,1,1,1,0,1])
        expect(role1).to.eql(game.player_x)

        expect(game.availableMoves(game.player_o)).not.to.include('o11')
        expect(game.availableMoves(game.player_o)).to.include('o01')

        const res = game.move('x11')
        expect(res[0]).to.eql(ErrorInvalidOutput)

        expect(game.hasWinner()[0]).to.be.false

        // finish the game
        game.move('o20')
        game.move('x00')
        game.move('o21')
        game.move('x22') // X wins

        expect(game.isOver()).to.be.true
        expect(game.hasWinner()[1]).to.eql(game.player_x)
    })

    // doing this for 100% test coverage
    it("O should be able to win (if x is a poor player :-P )", () => {
        const game = new Octoe()
        const play = (m: string) => {
            let res = game.move(m)
            if (res[0] != null) {
                throw res[0]
            }
        }

        play('x01')
        play('o11')
        play('x02')
        play('o00')
        play('x20')
        expect(game.hasWinner()[1]).to.be.null
        expect(game.isOver()).to.be.false
        play('o22')
        expect(game.hasWinner()[1]).to.eql(game.player_o)

    })

    it("should allow user to provide input state", () => {
        const game = new Octoe(Model.initialState())
        // TODO: add better test of state
    })

    it("should not allow a frozen model to be altered", () => {
        expect(() => {
            Model.place({label: 'fail'})
        }).to.throw(ErrorFrozenModel)
        expect(() => {
            Model.transition({label: 'fail'})
        }).to.throw(ErrorFrozenModel)
    })
})

