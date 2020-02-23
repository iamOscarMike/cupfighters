import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { shallow, configure } from 'enzyme';
import { useSelector } from "react-redux";
import SelectTournament from '../../components/SelectTournament/SelectTournament';
import Tournament from '../Tournament/Tournament';

configure({ adapter: new Adapter() });

jest.mock("react-redux");

describe('App', () => {
    afterEach(() => { jest.clearAllMocks() });
    afterAll(() => { jest.restoreAllMocks() });

    it('renders SelectTournament if there is no active tournament', () => {
        useSelector.mockImplementation(() => (null));
        const app = shallow(<App />);
        expect(app.find(SelectTournament).length).toEqual(1);
    });

    it('renders the current active tournament', () => {
        useSelector.mockImplementation(() => ({ title: 'My active tournament' }));
        const app = shallow(<App />);
        expect(app.find(Tournament).length).toEqual(1);
    });
});
