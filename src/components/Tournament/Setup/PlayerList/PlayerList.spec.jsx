import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import PlayerList from './PlayerList';

configure({ adapter: new Adapter() });

describe('PlayerList', () => {
    const players = ['van Bronckhorst', 'van Gastel', 'Kuyt'];
    const deletePlayer = jest.fn();
    const updatePlayer = jest.fn();
    const render = () => (shallow(<PlayerList players={players}  deletePlayer={deletePlayer} updatePlayer={updatePlayer} />));

    it('renders a list of players', () => {
        const playerList = render();
        expect(playerList.find('li').length).toEqual(players.length);
        players.forEach((player, index) => {
            expect(playerList.find('li').at(index).text()).toContain(player);
        });
    });

    it('calls deletePlayer on click delete', () => {
        const playerList = render();
        playerList.find('button').at(1).simulate('click');
        expect(deletePlayer).toBeCalledWith('van Bronckhorst');
    });

    it('calls updatePlayer on click update', () => {
        const playerList = render();
        playerList.find('button').at(0).simulate('click');
        expect(updatePlayer).toBeCalledWith('van Bronckhorst');
    });
});
