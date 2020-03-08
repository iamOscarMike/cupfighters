import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import SelectPlayersInKnockout from './SelectPlayersInKnockout';

configure({ adapter: new Adapter() });

const mockSetAmountOfPlayersInKnockout = jest.fn();

describe('SelectPlayersInKnockout', () => {
    it('renders a dropdownlist without valid options when there are too few players', () => {
        const selectPlayersInKnockout = shallow(<SelectPlayersInKnockout
            setAmountOfPlayersInKnockout={mockSetAmountOfPlayersInKnockout}
            players={['Roy Makaay']}
        />);
        expect(selectPlayersInKnockout.find('option').at(1).text()).toEqual('Unable to pick amount with 1 players');
    });

    it('renders a dropdownlist with 2 options based on the amount of players', () => {
        const selectPlayersInKnockout = shallow(<SelectPlayersInKnockout
            setAmountOfPlayersInKnockout={mockSetAmountOfPlayersInKnockout}
            players={[
                'Roy Makaay',
                'Robin van Persie',
                'Pierre van Hooijdonk'
            ]}
        />);
        expect(selectPlayersInKnockout.find('option')).toHaveLength(2);
    });

    it('renders a dropdownlist with 3 options based on the amount of players', () => {
        const selectPlayersInKnockout = shallow(<SelectPlayersInKnockout
            players={[
                'Roy Makaay',
                'Robin van Persie',
                'Pierre van Hooijdonk',
                'Peter Houtman',
                'Graziano Pelle',
            ]}
            setAmountOfPlayersInKnockout={mockSetAmountOfPlayersInKnockout}
        />);
        expect(selectPlayersInKnockout.find('option')).toHaveLength(3);
    });

    it('renders a dropdownlist with 4 options based on the amount of players', () => {
        const selectPlayersInKnockout = shallow(<SelectPlayersInKnockout
            setAmountOfPlayersInKnockout={mockSetAmountOfPlayersInKnockout}
            players={[
                'Roy Makaay',
                'Robin van Persie',
                'Pierre van Hooijdonk',
                'Peter Houtman',
                'Graziano Pelle',
                'Julio Ricardo Cruz',
                'Salomon Kalou',
                'John Guidetti',
                'Mike Obiku',
            ]}
        />);
        expect(selectPlayersInKnockout.find('option')).toHaveLength(4);
    });

    it('it calls setAmountOfPlayersInKnockout on change', () => {
        const selectPlayersInKnockout = mount(<SelectPlayersInKnockout
            setAmountOfPlayersInKnockout={mockSetAmountOfPlayersInKnockout}
            players={[
                'Roy Makaay',
                'Robin van Persie',
                'Pierre van Hooijdonk'
            ]}
        />);

        selectPlayersInKnockout.find('option').at(0).instance().selected = false;
        selectPlayersInKnockout.find('option').at(1).instance().selected = true;
        selectPlayersInKnockout.find('select').simulate('change');
        expect(mockSetAmountOfPlayersInKnockout).toBeCalledWith('2');
    });
});
