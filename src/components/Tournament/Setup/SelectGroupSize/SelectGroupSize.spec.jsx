import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import SelectGroupSize from './SelectGroupSize';

configure({ adapter: new Adapter() });

const mockSetGroupSize = jest.fn();

describe('SelectGroupSize', () => {
    it('renders a dropdownlist without valid options when there are too few players', () => {
        const selectGroupSize = shallow(<SelectGroupSize
            setGroupSize={mockSetGroupSize}
            players={['Roy Makaay']}
        />);
        expect(selectGroupSize.find('option').at(1).text()).toEqual('Unable to pick group size with 1 players');
    });

    it('renders a dropdownlist with 2 options based on the amount of players', () => {
        const selectGroupSize = shallow(<SelectGroupSize
            setGroupSize={mockSetGroupSize}
            players={[
                'Roy Makaay',
                'Robin van Persie',
                'Pierre van Hooijdonk',
                'Peter Houtman',
                'Joseph Kiprich',
                'Ulrich van Gobbel',
            ]}
        />);
        expect(selectGroupSize.find('option').at(1).text()).toEqual('3 players per group, 2 groups');
    });

    it('it calls setGroupSize on change', () => {
        const selectGroupSize = mount(<SelectGroupSize
            setGroupSize={mockSetGroupSize}
            players={[
                'Roy Makaay',
                'Robin van Persie',
                'Pierre van Hooijdonk',
                'Peter Houtman',
                'Joseph Kiprich',
                'Ulrich van Gobbel',
            ]}
        />);

        selectGroupSize.find('option').at(0).instance().selected = false;
        selectGroupSize.find('option').at(1).instance().selected = true;
        selectGroupSize.find('select').simulate('change');
        expect(mockSetGroupSize).toBeCalledWith('3');
    });
});
