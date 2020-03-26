import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { useSelector } from "react-redux";
import Table from './Table';

configure({ adapter: new Adapter() });
jest.mock('react-redux');

describe('Table', () => {
    it('renders a table', () => {

        useSelector
            .mockImplementationOnce(() => ('van Gastel'))
            .mockImplementationOnce(() => ('van Bronckhorst'))
            .mockImplementationOnce(() => ('van Hooijdonk'))
            .mockImplementationOnce(() => ('van Wonderen'));

        const stats = [
            { player: 'player#1' },
            { player: 'player#2' },
            { player: 'player#3' },
            { player: 'player#4' },
        ];
        const table = shallow(<Table stats={stats} playersThrough={['player#1', 'player#2']} playersBestThird={['player#3']}/>);

        expect(table.find('tbody').find('tr').at(0).find('td').at(0).text()).toEqual('van Gastel');
        expect(table.find('tbody').find('tr').at(0).find('td').at(0).props().className).toEqual('proceed');

        expect(table.find('tbody').find('tr').at(1).find('td').at(0).text()).toEqual('van Bronckhorst');
        expect(table.find('tbody').find('tr').at(1).find('td').at(0).props().className).toEqual('proceed');

        expect(table.find('tbody').find('tr').at(2).find('td').at(0).text()).toEqual('van Hooijdonk');
        expect(table.find('tbody').find('tr').at(2).find('td').at(0).props().className).toEqual('best-third');

        expect(table.find('tbody').find('tr').at(3).find('td').at(0).text()).toEqual('van Wonderen');
        expect(table.find('tbody').find('tr').at(3).find('td').at(0).props().className).toEqual(null);
    });
});
