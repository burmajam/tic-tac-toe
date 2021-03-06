'use strict';
jest.dontMock('../components/tictactoe.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const TicTacToe = require('../components/tictactoe');
const Heading = require('../components/heading');
const Board = require('../components/board/board');
const GameControl = require('../components/game-control');
const GameActions = require('../components/game-requests/game-actions');

describe('When rendering tic tac toe index', () => {
    let tictactoe;
    beforeEach(() => {
        tictactoe = TestUtils.renderIntoDocument(<TicTacToe />);
    });

    it('should render the game heading', () => {
        var heading = TestUtils.findRenderedComponentWithType(tictactoe, Heading);

        expect(heading).toBeDefined();
    });

    it('should render the board', () => {
        var board = TestUtils.findRenderedComponentWithType(tictactoe, Board);

        expect(board).toBeDefined();
    });

    it('should render game control', () => {
        var gameControl = TestUtils.findRenderedComponentWithType(tictactoe, GameControl);

        expect(gameControl).toBeDefined();
    });
});

describe('When game starts', () => {
    let tictactoe, nextPlayer, type, players;
    beforeEach(() => {
        GameActions.computerMove = jest.genMockFunction();

        tictactoe = TestUtils.renderIntoDocument(<TicTacToe />);

        type = "human_computer";
        players = [{
            type: "human"
        }, {
            type: "computer"
        }];
    });

    it('triggers a computer move if first player is computer', () => {
        nextPlayer = "X";

        tictactoe.onStartCompleted({type: type, players: players, nextPlayer: nextPlayer});

        expect(GameActions.computerMove).toBeCalled();
    });

    it('does not trigger a computer move if first player is human', () => {
        nextPlayer = "O";

        tictactoe.onStartCompleted({type: type, players: players, nextPlayer: nextPlayer});

        expect(GameActions.computerMove).not.toBeCalled();
    });
});

describe('When move is completed', () => {
    let tictactoe, type, players;
    beforeEach(() => {
        GameActions.computerMove = jest.genMockFunction();

        tictactoe = TestUtils.renderIntoDocument(<TicTacToe />);

        type = "human_computer";
        players = [{
            type: "human"
        }, {
            type: "computer"
        }];
    });

    it('triggers a computer move if next player is computer', () => {
        tictactoe.setState({type: type, players: players});

        tictactoe.onMoveCompleted({nextPlayer: "X"});

        expect(GameActions.computerMove).toBeCalled();
    });

    it('does not trigger a computer move if next player is human', () => {
        tictactoe.setState({type: type, players: players});

        tictactoe.onMoveCompleted({nextPlayer: "O"});

        expect(GameActions.computerMove).not.toBeCalled();
    });
});

describe('When user selects to start a new game', () => {

    it('starts game with default initial values', () => {
        let tictactoe = TestUtils.renderIntoDocument(<TicTacToe />);

        tictactoe.startNewGame();

        let newGame = tictactoe.newGameState();
        expect(tictactoe.state).toEqual(newGame);
    });
});

describe('When user selects to repeat the same game', () => {
    let tictactoe, players;
    beforeEach(() => {
        GameActions.start = jest.genMockFunction();
        tictactoe = TestUtils.renderIntoDocument(<TicTacToe />);

        players = [{
            type: "human"
        }, {
            type: "computer"
        }];
    });

    it('starts new game with same players', () => {
        tictactoe.repeatGame();

        expect(GameActions.start).toBeCalledWith({players: players, firstPlayer: "O"});
    });

    it('blanks winner', () => {
        tictactoe.repeatGame();

        expect(tictactoe.state.winner).toEqual("");
    });

    it('is not a draw yet', () => {
        tictactoe.repeatGame();

        expect(tictactoe.state.draw).toBeFalsy();
    });
});