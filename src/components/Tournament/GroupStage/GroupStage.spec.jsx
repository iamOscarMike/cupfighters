import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { useSelector, useDispatch } from "react-redux";
import GroupStage from './GroupStage';
import Table from './Table/Table';
import Match from '../../Match/Match';
import { createGroupsStats, getPlayersThroughFromStats } from './scripts/stats';
import { FINISH_GROUP_STAGE } from '../../../redux/actionTypes';

configure({ adapter: new Adapter() });
jest.mock('react-redux');
jest.mock('./scripts/stats');

describe('GroupStage', () => {
    const tournament = {
        amountOfPlayersInKnockOut: 4,
        groups: [
            {
                players: ['player#123', 'player#124', 'player#125'],
                matches: ['match#123', 'match#124', 'match#125'],
            },
            {
                players: ['player#223', 'player#224', 'player#225'],
                matches: ['match#223', 'match#224', 'match#225'],
            },
        ]
    };
    createGroupsStats.mockImplementation(() => ([[], []]));
    getPlayersThroughFromStats.mockImplementation(() => ({
        playersThrough: [],
        playersBestThird: [],
    }));

    it('renders the group stage', () => {
        useSelector
            .mockImplementationOnce(() => (tournament))
            .mockImplementationOnce(() => ({ ['match#1']: { score1: 1, score2: null } }));

        const groupStage = shallow(<GroupStage />);
        expect(groupStage.find('h3').at(0).text()).toEqual('Group a');
        expect(groupStage.find('h3').at(1).text()).toEqual('Group b');
        expect(groupStage.find(Table).length).toEqual(2);
        expect(groupStage.find(Match).length).toEqual(6);
    });

    it('renders a disabled button if not all matches are finished', () => {
        useSelector
            .mockImplementationOnce(() => (tournament))
            .mockImplementationOnce(() => ({ ['match#1']: { score1: 1, score2: null } }));

        const groupStage = shallow(<GroupStage />);
        expect(groupStage.find('button.btn-outline-primary.btn-lg').props().disabled).toEqual(true);
    });

    it('renders an enabled button if all matches are finished', () => {
        useSelector
            .mockImplementationOnce(() => (tournament))
            .mockImplementationOnce(() => ({ ['match#1']: { score1: 1, score2: 1 } }));
        const dispatch = jest.fn(() => { });
        useDispatch.mockImplementation(() => dispatch);

        const groupStage = shallow(<GroupStage />);
        expect(groupStage.find('button.btn-outline-primary.btn-lg').props().disabled).toEqual(false);

        groupStage.find('button.btn-outline-primary.btn-lg').simulate('click');
        expect(dispatch).toHaveBeenCalledWith({
            type: FINISH_GROUP_STAGE,
            payload: {},
        });
    });
});
