import React from 'react';
import KnockoutStage from './KnockoutStage';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { useSelector } from "react-redux";
import { stages } from '../../../types/stages';
import Bracket from './Bracket/Bracket';

configure({ adapter: new Adapter() });
jest.mock('react-redux');

describe('KnockoutStage', () => {
    const tournament = {
        stage: stages.knockoutStage,
        knockoutRounds: [{ matches: ['match#1', 'match#2'] }],
    };

    it('renders the knockout stage', () => {
        useSelector
            .mockImplementationOnce(() => (tournament))
            .mockImplementationOnce(() => ({ ['match#1']: { score1: null, score2: null } }));

        const knockoutStage = shallow(<KnockoutStage />);
        expect(knockoutStage.find(Bracket).length).toEqual(1);
        expect(knockoutStage.find(Bracket).props().rounds).toEqual(tournament.knockoutRounds);
    });
});
