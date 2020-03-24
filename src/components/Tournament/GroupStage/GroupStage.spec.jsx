import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { useSelector } from "react-redux";
import GroupStage from './GroupStage';
import Table from './Table/Table';

configure({ adapter: new Adapter() });
jest.mock('react-redux');

describe('GroupStage', () => {
    it('renders the group stage', () => {
        useSelector
            .mockImplementationOnce(() => ([
                {
                    players: ['player#123', 'player#124', 'player#125'],
                    matches: ['match#123', 'match#124', 'match#125'],
                },
                {
                    players: ['player#223', 'player#224', 'player#225'],
                    matches: ['match#223', 'match#224', 'match#225'],
                },
            ]));
        const groupStage = mount(<GroupStage />);
        expect(groupStage.find('h3').at(0).text()).toEqual('Group a');
        expect(groupStage.find('h3').at(1).text()).toEqual('Group b');
        expect(groupStage.find(Table).length).toEqual(2);
    });
});
