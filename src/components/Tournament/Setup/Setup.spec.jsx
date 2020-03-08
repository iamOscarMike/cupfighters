import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Setup from './Setup';
import AddPlayerForm from './AddPlayerForm/AddPlayerForm';
import PlayerList from './PlayerList/PlayerList';

configure({ adapter: new Adapter() });

describe('Setup', () => {
    it('renders AddPlayerForm', () => {
        const setup = mount(<Setup />);
        expect(setup.find(AddPlayerForm).length).toEqual(1);
    });

    it('adds players to the list', () => {
        const setup = mount(<Setup />);
        const addPlayerForm = setup.find(AddPlayerForm);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Tomasson' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(setup.find(PlayerList).props().players).toContain('Tomasson');
    });

    it('disables the form when 16 players are added', () => {
        const setup = mount(<Setup />);
        const addPlayerForm = setup.find(AddPlayerForm);
        expect(addPlayerForm.props().maxPlayersReached).toEqual(false);
        [...Array(16)].map((_, i) => {
            addPlayerForm.find('input').simulate('change', { target: { value: `Player${i}` } });
            addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        });
        expect(setup.find(AddPlayerForm).props().maxPlayersReached).toEqual(true);
    });

    it('removes a player from the list', () => {
        const setup = mount(<Setup />);

        const addPlayerForm = setup.find(AddPlayerForm);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Tomasson' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });

        const playerList = setup.find(PlayerList);
        playerList.find('button').at(1).simulate('click');

        expect(setup.find(PlayerList).props().players).not.toContain('Tomasson');
        expect(setup.find(PlayerList).props().players).toContain('Shinji Ono');
    });

    it('updates a player from the list', () => {
        const setup = mount(<Setup />);

        const addPlayerForm = setup.find(AddPlayerForm);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Tomasson' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });

        const playerList = setup.find(PlayerList);
        playerList.find('button').at(0).simulate('click');

        expect(setup.find(PlayerList).props().players).not.toContain('Tomasson');
        expect(setup.find(AddPlayerForm).find('input').props().value).toMatch('Tomasson');
        expect(setup.find(PlayerList).props().players).toContain('Shinji Ono');
    });
});
