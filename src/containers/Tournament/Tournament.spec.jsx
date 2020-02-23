import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { useDispatch } from "react-redux";
import Tournament from './Tournament';
import { UNSET_ACTIVE_TOURNAMENT } from '../../redux/actionTypes';

configure({ adapter: new Adapter() });

jest.mock("react-redux");

describe('Tournament', () => {
    afterEach(() => { jest.clearAllMocks() });
    afterAll(() => { jest.restoreAllMocks() });

    it('shows te passed tournament', () => {
        const title = 'My current tournament';
        const tournament = shallow(<Tournament tournament={{ title }} />);
        expect(tournament.find('h1').text()).toEqual(title);
    });

    it('unsets an active tournament', () => {
        const dispatch = jest.fn(() => { });
        useDispatch.mockImplementation(() => dispatch);
        const tournament = shallow(<Tournament tournament={{ title: 'Tournament' }} />);
        tournament.find('button').simulate('click');
        expect(dispatch).toHaveBeenCalledWith({ type: UNSET_ACTIVE_TOURNAMENT });
    });
});
