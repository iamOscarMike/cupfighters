import React from 'react';
import KnockoutStage from './KnockoutStage';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { useSelector } from "react-redux";
import { stages } from '../../../types/stages';
import Bracket from './Bracket/Bracket';
import Match from '../../Match/Match';

configure({ adapter: new Adapter() });
jest.mock('react-redux');

describe('KnockoutStage', () => {
    const tournament = {
        stage: stages.knockoutStage,
        knockoutRounds: [{ matches: ['match#1', 'match#2'] }],
        matches: {
            ['match#1']: { player1: 'player#1', player2: 'player#2', score1: null, score2: null },
            ['match#2']: { player1: 'player#3', player2: 'player#4', score1: null, score2: null },
        },
        players: {
            ['player#1']: 'van Gobbel',
            ['player#2']: 'Vossen',
            ['player#3']: 'Paauwe',
            ['player#4']: 'Cruz',
        },
    };

    it('renders the knockout stage', () => {
        useSelector
            .mockImplementationOnce(() => (tournament));

        const knockoutStage = shallow(<KnockoutStage />);
        expect(knockoutStage.find(Bracket).length).toEqual(1);
        expect(knockoutStage.find(Bracket).props().rounds).toEqual(tournament.knockoutRounds);
        expect(knockoutStage.find(Bracket).props().matches).toEqual(tournament.matches);
        expect(knockoutStage.find(Bracket).props().players).toEqual(tournament.players);

        expect(knockoutStage.find(Match).length).toEqual(2);
        expect(knockoutStage.find('button').length).toEqual(1);
        expect(knockoutStage.find('button').props().disabled).toEqual(true);
    });

    it('renders an enabled finish round button', () => {
        useSelector
            .mockImplementationOnce(() => ({
                ...tournament,
                matches: {
                    ['match#1']: { player1: 'player#1', player2: 'player#2', score1: 2, score2: 0 },
                    ['match#2']: { player1: 'player#3', player2: 'player#4', score1: 0, score2: 0, throughOnPenalties: 'player#3' },
                },
            }));

        const knockoutStage = shallow(<KnockoutStage />);
        expect(knockoutStage.find('button').length).toEqual(1);
        expect(knockoutStage.find('button').props().disabled).toEqual(false);
    });
});
