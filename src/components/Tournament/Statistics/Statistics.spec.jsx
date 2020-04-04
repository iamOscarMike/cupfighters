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
                goldenBoot: ['player#1', 'player#2', 'player#3'],
                goldenGlove: ['player#1', 'player#2', 'player#3'],
                playerStats: {
                    ['player#1']: { played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, cleanSheets: 0 },
                    ['player#2']: { played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, cleanSheets: 0 },
                    ['player#3']: { played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, cleanSheets: 0 },
                    ['player#4']: { played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, cleanSheets: 0 },
                }
            }));

        const statistics = shallow(<Statistics />);
    });
});
