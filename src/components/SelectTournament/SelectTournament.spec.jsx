import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { useSelector } from "react-redux";
import SelectTournament from './SelectTournament';
import NewTournament from '../NewTournament/NewTournament';

configure({ adapter: new Adapter() });

jest.mock("react-redux", () => ({
    useSelector: jest.fn(fn => fn()),
}));

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
});
