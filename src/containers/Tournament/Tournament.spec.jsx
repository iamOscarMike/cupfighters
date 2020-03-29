import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { useDispatch } from "react-redux";
import Tournament from './Tournament';
import { UNSET_ACTIVE_TOURNAMENT } from '../../redux/actionTypes';
import { stages } from '../../types/stages';
import Setup from '../../components/Tournament/Setup/Setup';
import GroupStage from '../../components/Tournament/GroupStage/GroupStage';
import KnockoutStage from '../../components/Tournament/KnockoutStage/KnockoutStage';

configure({ adapter: new Adapter() });

jest.mock("react-redux");

describe('Tournament', () => {
    afterEach(() => { jest.clearAllMocks() });
    afterAll(() => { jest.restoreAllMocks() });

    it('shows te passed tournament', () => {
        const title = 'My current tournament';
        const tournament = shallow(<Tournament tournament={{ title, stage: stages.setup }} />);
        expect(tournament.find('h1').text()).toEqual(title);
    });

    it('unsets an active tournament', () => {
        const dispatch = jest.fn(() => { });
        useDispatch.mockImplementation(() => dispatch);
        const tournament = shallow(<Tournament tournament={{ title: 'Tournament', stage: stages.setup }} />);
        tournament.find('button').simulate('click');
        expect(dispatch).toHaveBeenCalledWith({ type: UNSET_ACTIVE_TOURNAMENT });
    });

    it('renders the setup component when stage is setup', () => {
        const tournament = shallow(<Tournament tournament={{ title: 'T2', stage: stages.setup }} />);
        expect(tournament.find(Setup).length).toEqual(1);
    });

    it('renders the groupStage component when stage is group stage', () => {
        const tournament = shallow(<Tournament tournament={{ title: 'T2', stage: stages.groupStage }} />);
        expect(tournament.find(GroupStage).length).toEqual(1);
        expect(tournament.find(KnockoutStage).length).toEqual(0);

        expect(tournament.find('a[href="#group"]').props().className).toContain('active');
        expect(tournament.find('a[href="#group"]').props().className).not.toContain('disabled');

        expect(tournament.find('a[href="#knockout"]').props().className).not.toContain('active');
        expect(tournament.find('a[href="#knockout"]').props().className).toContain('disabled');

        expect(tournament.find('a[href="#finished"]').props().className).not.toContain('active');
        expect(tournament.find('a[href="#finished"]').props().className).toContain('disabled');
    });

    it('renders the knockoutStage component when stage is knockout stage', () => {
        const tournament = shallow(<Tournament tournament={{ title: 'T2', stage: stages.knockoutStage }} />);
        expect(tournament.find(GroupStage).length).toEqual(1);
        expect(tournament.find(KnockoutStage).length).toEqual(1);

        expect(tournament.find('a[href="#group"]').props().className).not.toContain('active');
        expect(tournament.find('a[href="#group"]').props().className).not.toContain('disabled');

        expect(tournament.find('a[href="#knockout"]').props().className).toContain('active');
        expect(tournament.find('a[href="#knockout"]').props().className).not.toContain('disabled');

        expect(tournament.find('a[href="#finished"]').props().className).not.toContain('active');
        expect(tournament.find('a[href="#finished"]').props().className).toContain('disabled');
    });
});
