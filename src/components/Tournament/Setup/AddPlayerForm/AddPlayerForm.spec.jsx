import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import AddPlayerForm from './AddPlayerForm';

configure({ adapter: new Adapter() });
const mockAddPlayerCallback = jest.fn(() => { });
const mockSetInput = jest.fn(() => { });

const render = (maxPlayersReached = false, input = '', setInput = mockSetInput, addPlayerCallback = mockAddPlayerCallback, players = []) => (
    shallow(<AddPlayerForm
        maxPlayersReached={maxPlayersReached}
        input={input}
        setInput={setInput}
        addPlayerCallback={addPlayerCallback}
        players={players}
    />)
);

describe('AddPlayerForm', () => {

    it('updates the value of the input', () => {
        const addPlayerForm = render();
        addPlayerForm.find('input').simulate('change', { target: { value: 'Shinji Ono' } });
        expect(mockSetInput).toHaveBeenCalledWith('Shinji Ono');
    });

    it('enables the input and button when max players is not reached', () => {
        const addPlayerForm = render();
        expect(addPlayerForm.find('input').props().disabled).toEqual(false);
        expect(addPlayerForm.find('input').props().placeholder).toEqual('');
        expect(addPlayerForm.find('button').props().disabled).toEqual(false);
    });

    it('disables the input and button when max players is reached', () => {
        const addPlayerForm = render(true);
        expect(addPlayerForm.find('input').props().disabled).toEqual(true);
        expect(addPlayerForm.find('input').props().placeholder).toEqual('Max players reached');
        expect(addPlayerForm.find('button').props().disabled).toEqual(true);
    });

    it('shows an error when form submitted, but input was empty', () => {
        const addPlayerForm = render();
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(addPlayerForm.find('div.invalid-feedback').text()).toEqual('Player cannot be empty');
        expect(mockAddPlayerCallback).not.toHaveBeenCalled();
    });

    it('shows an error when form submitted, but input was more than 15 characters', () => {
        const addPlayerForm = render(false, 'aaaaa bbbbb ccccc');
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(addPlayerForm.find('div.invalid-feedback').text()).toEqual('Length should not be longer than 15');
        expect(mockAddPlayerCallback).not.toHaveBeenCalled();
    });

    it('shows an error when form submitted, but player was already added', () => {
        const addPlayerForm = render(false, 'Shinji Ono', mockSetInput, mockAddPlayerCallback, ['Shinji Ono']);
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(addPlayerForm.find('div.invalid-feedback').text()).toEqual('Shinji Ono was already added');
        expect(mockAddPlayerCallback).not.toHaveBeenCalled();
    });

    it('executes callback with submitted player', () => {
        const addPlayerForm = render(false, 'Shinji Ono');
        addPlayerForm.find('form').simulate('submit', { preventDefault() { } });
        expect(mockAddPlayerCallback).toHaveBeenCalledWith('Shinji Ono');
        expect(mockSetInput).toHaveBeenCalledWith('');
    });
});
