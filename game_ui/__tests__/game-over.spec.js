'use strict';
jest.dontMock('../components/game-progress/game-over.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const GameOver = require('../components/game-progress/game-over');

describe('When game is not over', () => {
    let gameOver;
    beforeEach(() => {
        gameOver = TestUtils.renderIntoDocument(<GameOver draw={false} winner={""}/>);
    });

    it('should not render winner', () => {
        var winners = TestUtils.scryRenderedDOMComponentsWithClass(gameOver, "winner");

        expect(winners.length).toEqual(0);
    });

    it('should not render game draw', () => {
        var draws = TestUtils.scryRenderedDOMComponentsWithClass(gameOver, "draw");

        expect(draws.length).toEqual(0);
    });
});

describe('When game has a winner', () => {
    let gameOver;
    beforeEach(() => {
        gameOver = TestUtils.renderIntoDocument(<GameOver draw={false} winner={"O"}/>);
    });

    it('it renders a winner', () => {
        var winner = TestUtils.findRenderedDOMComponentWithClass(gameOver, "winner");

        expect(winner).toBeDefined();
    });
});

describe('When game is a draw', () => {
    let gameOver;
    beforeEach(() => {
        gameOver = TestUtils.renderIntoDocument(<GameOver draw={true} winner={""}/>);
        gameOver.setState({winner: "", draw: true});
    });

    it('it renders a draw', () => {
        var draw = TestUtils.findRenderedDOMComponentWithClass(gameOver, "draw");

        expect(draw).toBeDefined();
    });
});

describe('When user wants to start a new game', () => {
    let gameOver, repeatGame, startNewGame;
    beforeEach(() => {
        repeatGame = jest.genMockFunction();
        startNewGame = jest.genMockFunction();
        gameOver = TestUtils.renderIntoDocument(<GameOver draw={false} winner={""} repeatGame={repeatGame} startNewGame={startNewGame}/>);
        gameOver.setState({winner: "", draw: true});
    });

    it('starts new game', () => {
        gameOver.restartGame("new");

        expect(startNewGame).toBeCalled();
    });
});

describe('When user wants to start new game with same selection', () => {
    let gameOver, repeatGame, startNewGame;
    beforeEach(() => {
        repeatGame = jest.genMockFunction();
        startNewGame = jest.genMockFunction();
        gameOver = TestUtils.renderIntoDocument(<GameOver draw={false} winner={""} repeatGame={repeatGame} startNewGame={startNewGame}/>);
        gameOver.setState({winner: "", draw: true});
    });

    it('calls repeat game', () => {
        gameOver.restartGame("repeat");

        expect(repeatGame).toBeCalled();
    });
});