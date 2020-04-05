import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Setup from './Setup';
import AddPlayerForm from './AddPlayerForm/AddPlayerForm';
import PlayerList from './PlayerList/PlayerList';
import SelectPlayersInKnockout from './SelectPlayersInKnockout/SelectPlayersInKnockout';
import SelectGroupSize from './SelectGroupSize/SelectGroupSize';
import { useDispatch } from "react-redux";
import { FINISH_SETUP } from '../../../redux/actionTypes';

configure({ adapter: new Adapter() });
jest.mock('react-redux');

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

    it('shows an initial disabled complete button', () => {
        const setup = mount(<Setup />);
        expect(setup.find('button.btn-outline-primary').at(0).text()).toEqual('Continue');
        expect(setup.find('button.btn-outline-primary').at(0).props().disabled).toEqual(true);
    });

    it('shows an enabled complete button', () => {
        const dispatch = jest.fn(() => { });
        useDispatch.mockImplementation(() => dispatch);
        const setup = mount(<Setup />);

        const addPlayerForm = setup.find(AddPlayerForm);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Tomasson' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'Kiprich' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'van Gastel' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'van Gobbel' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        addPlayerForm.find('input').simulate('change', { target: { value: 'Kalou' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });

        const selectPlayersInKnockout = setup.find(SelectPlayersInKnockout);
        selectPlayersInKnockout.find('option').at(0).instance().selected = false;
        selectPlayersInKnockout.find('option').at(1).instance().selected = true;
        selectPlayersInKnockout.find('select').simulate('change');

        const selectGroupSize = setup.find(SelectGroupSize);
        selectGroupSize.find('option').at(0).instance().selected = false;
        selectGroupSize.find('option').at(1).instance().selected = true;
        selectGroupSize.find('select').simulate('change');

        expect(setup.find('button.btn-outline-primary').at(0).text()).toEqual('Continue');
        expect(setup.find('button.btn-outline-primary').at(0).props().disabled).toEqual(false);

        setup.find('button.btn-outline-primary').at(0).simulate('click');
        expect(dispatch).toHaveBeenCalledWith({
            type: FINISH_SETUP, 
            payload: {
                players: [
                    'Tomasson',
                    'Shinji Ono',
                    'Kiprich',
                    'van Gastel',
                    'van Gobbel',
                    'Kalou',
                ],
                amountOfPlayersInKnockout: 4,
                groupSize: 3,
            }
        });
    });
});
