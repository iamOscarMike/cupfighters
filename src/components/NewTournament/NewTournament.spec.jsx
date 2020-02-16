import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import NewTournament from './NewTournament';
import { useDispatch } from 'react-redux';
import { START_NEW_TOURNAMENT } from '../../redux/actionTypes';

configure({ adapter: new Adapter() });

jest.mock('react-redux');

describe('SelectTournament', () => {
    it('dispatches a start new tournament action', () => {
        const dispatch = jest.fn(() => { });
        useDispatch.mockImplementation(() => dispatch);
        const title = 'My new tournament';

        const newTournament = shallow(<NewTournament />);
        newTournament.find('input').simulate('change', { target: { value: title } });
        newTournament.find('form').simulate('submit', { preventDefault() { } });
        expect(dispatch).toHaveBeenCalledWith({ type: START_NEW_TOURNAMENT, payload: { title } });
    });
});
