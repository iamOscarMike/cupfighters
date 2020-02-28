import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import AddPlayerForm from './AddPlayerForm';

configure({ adapter: new Adapter() });
const mockCallback = jest.fn(() => { });

describe('AddPlayerForm', () => {

    it('updates the value of the input', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={false} addPlayerCallback={mockCallback} />);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        expect(addPlayerForm.find('input').props().value).toEqual('Shinji Ono');
    });

    it('enables the input and button when max players is not reached', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={false} addPlayerCallback={mockCallback} />);
        expect(addPlayerForm.find('input').props().disabled).toEqual(false);
        expect(addPlayerForm.find('input').props().placeholder).toEqual('');
        expect(addPlayerForm.find('button').props().disabled).toEqual(false);
    });

    it('disables the input and button when max players is reached', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={true} addPlayerCallback={mockCallback} />);
        expect(addPlayerForm.find('input').props().disabled).toEqual(true);
        expect(addPlayerForm.find('input').props().placeholder).toEqual('Max players reached');
        expect(addPlayerForm.find('button').props().disabled).toEqual(true);
    });

    it('shows an error when form submitted, but input was empty', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={false} addPlayerCallback={mockCallback} />);
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(addPlayerForm.find('div.invalid-feedback').text()).toEqual('Player cannot be empty');
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('shows an error when form submitted, but input was more than 15 characters', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={false} addPlayerCallback={mockCallback} />);
        addPlayerForm.find('input').simulate('change', { target: { value: 'aaaaa bbbbb ccccc' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(addPlayerForm.find('div.invalid-feedback').text()).toEqual('Length should not be longer than 15');
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('shows an error when form submitted, but player was already added', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={false} players={['Shinji Ono']} addPlayerCallback={mockCallback} />);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(addPlayerForm.find('div.invalid-feedback').text()).toEqual('Shinji Ono was already added');
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('executes callback with submitted player', () => {
        const addPlayerForm = shallow(<AddPlayerForm maxPlayersReached={false} addPlayerCallback={mockCallback} />);
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(mockCallback).toHaveBeenCalledWith('Shinji Ono');
        expect(addPlayerForm.find('input').props().value).toEqual('');
    });
});
