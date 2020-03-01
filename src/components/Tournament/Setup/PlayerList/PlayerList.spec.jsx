import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import PlayerList from './PlayerList';

configure({ adapter: new Adapter() });

describe('PlayerList', () => {
    it('renders a list of players', () => {
        const players = ['van Bronckhorst', 'van Gastel', 'Kuyt'];
        const playerList = shallow(<PlayerList players={players} />);
        expect(playerList.find('li').length).toEqual(players.length);
        players.forEach((player, index) => {
            expect(playerList.find('li').at(index).text()).toContain(player);
        });
    });
});
