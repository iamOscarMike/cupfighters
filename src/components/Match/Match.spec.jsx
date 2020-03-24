import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { useSelector, useDispatch } from 'react-redux';
import Match from './Match';
import { UPDATE_MATCH } from '../../redux/actionTypes';

configure({ adapter: new Adapter() });
jest.mock('react-redux');

describe('Match', () => {
    const matchId = 'match-123';
    it('renders a match', () => {
        useSelector
            .mockImplementationOnce(() => ({ player1: 'player#123', player2: 'player#124', score1: null, score2: null }))
            .mockImplementationOnce(() => ('Guidetti'))
            .mockImplementationOnce(() => ('Pelle'));
        const match = shallow(<Match matchId={matchId} matchIndicator="test" />);

        expect(match.find(`input#${matchId}-player1`).props().value).toEqual('');
        expect(match.find('.container-player1 label').text()).toEqual('Guidetti');

        expect(match.find(`input#${matchId}-player2`).props().value).toEqual('');
        expect(match.find('.container-player2 label').text()).toEqual('Pelle');
    });

    it('resumes a match with data from store', () => {
        useSelector
            .mockImplementationOnce(() => ({ player1: 'player#123', player2: 'player#124', score1: 6, score2: 2 }))
            .mockImplementationOnce(() => ('Guidetti'))
            .mockImplementationOnce(() => ('Pelle'));

        const match = shallow(<Match matchId={matchId} matchIndicator="test" />);

        expect(match.find(`input#${matchId}-player1`).props().value).toEqual(6);
        expect(match.find(`input#${matchId}-player2`).props().value).toEqual(2);
    });

    it('updates the scores', () => {
        useSelector
            .mockImplementationOnce(() => ({ player1: 'player#123', player2: 'player#124', score1: null, score2: null }))
            .mockImplementationOnce(() => ('Guidetti'))
            .mockImplementationOnce(() => ('Pelle'))
            .mockImplementationOnce(() => ({ player1: 'player#123', player2: 'player#124', score1: 0, score2: null }))
            .mockImplementationOnce(() => ('Guidetti'))
            .mockImplementationOnce(() => ('Pelle'))
            .mockImplementationOnce(() => ({ player1: 'player#123', player2: 'player#124', score1: 0, score2: 3 }))
            .mockImplementationOnce(() => ('Guidetti'))
            .mockImplementationOnce(() => ('Pelle'));

        const dispatch = jest.fn(() => { });
        useDispatch.mockImplementation(() => dispatch);

        const match = shallow(<Match matchId={matchId} matchIndicator="test" />);

        expect(match.find(`input#${matchId}-player1`).props().value).toEqual('');
        expect(match.find(`input#${matchId}-player2`).props().value).toEqual('');

        match.find(`input#${matchId}-player1`).simulate('change', { target: { value: 0 } });
        expect(match.find(`input#${matchId}-player1`).props().value).toEqual(0);
        expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_MATCH, payload: { matchId, score1: 0, score2: null } });

        match.find(`input#${matchId}-player2`).simulate('change', { target: { value: 3 } });
        expect(match.find(`input#${matchId}-player2`).props().value).toEqual(3);
        expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_MATCH, payload: { matchId, score1: 0, score2: 3 } });
    });
});
