import React from 'react';
import Statistics from './Statistics';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { useSelector } from "react-redux";

configure({ adapter: new Adapter() });
jest.mock('react-redux');

describe('Statistics', () => {
    it('renders statistics', () => {
        useSelector
            .mockImplementationOnce(() => ({
                players: {
                    ['player#1']: 'Kindvall',
                    ['player#2']: 'Moulijn',
                    ['player#3']: 'Van Hanegem',
                    ['player#4']: 'Israël',
                },
            }))
            .mockImplementationOnce(() => ({
                winner: 'player#2',
                runnerUp: 'player#3',
                semiFinalists: ['player#1', 'player#4'],
            }));

        const statistics = shallow(<Statistics />);
    });
});
