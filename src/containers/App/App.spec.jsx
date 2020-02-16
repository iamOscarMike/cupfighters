import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { shallow, configure } from 'enzyme';
import SelectTournament from '../../components/SelectTournament/SelectTournament';

configure({ adapter: new Adapter() });

describe('App', () => {
    it('renders SelectTournament', () => {
        const app = shallow(<App />);
        expect(app.find(SelectTournament).length).toEqual(1);
    });
});