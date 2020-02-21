import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { useSelector, useDispatch } from "react-redux";
import SelectTournament from './SelectTournament';
import NewTournament from '../NewTournament/NewTournament';
import { SET_ACTIVE_TOURNAMENT, DELETE_TOURNAMENT } from '../../redux/actionTypes';

configure({ adapter: new Adapter() });

jest.mock('react-redux');
global.confirm = () => true;

describe('SelectTournament', () => {

    afterEach(() => { jest.clearAllMocks() });
    afterAll(() => { jest.restoreAllMocks() });

    it('renders', () => {
        useSelector.mockImplementation(() => [
            { tournamentId: 'tournament#123', title: 'My first tournament' },
            { tournamentId: 'tournament#456', title: 'My second tournament' },
        ]);
        const selectTournament = shallow(<SelectTournament />);
        expect(selectTournament.find('li.tournament').length).toEqual(2);
        expect(selectTournament.find('li.tournament').at(0).text()).toEqual('My first tournament');
        expect(selectTournament.find('li.tournament').at(1).text()).toEqual('My second tournament');
        expect(selectTournament.find(NewTournament).length).toEqual(1);
    });

    it('sets an active tournament on click play', () => {
        const dispatch = jest.fn(() => { });
        const tournamentId = 'tournament#123';
        useSelector.mockImplementation(() => [{ tournamentId, title: 'My tournament' }]);
        useDispatch.mockImplementation(() => dispatch);
        const selectTournament = shallow(<SelectTournament />);
        selectTournament.find('button').at(1).simulate('click');
        expect(dispatch).toHaveBeenCalledWith({ type: SET_ACTIVE_TOURNAMENT, payload: { tournamentId } });
    });

    it('removes a tournament on click delete', () => {
        const dispatch = jest.fn(() => { });
        const tournamentId = 'tournament#123';
        useSelector.mockImplementation(() => [{ tournamentId, title: 'My tournament' }]);
        useDispatch.mockImplementation(() => dispatch);
        const selectTournament = shallow(<SelectTournament />);
        selectTournament.find('button').at(0).simulate('click');
        expect(dispatch).toHaveBeenCalledWith({ type: DELETE_TOURNAMENT, payload: { tournamentId } });
    });
});
