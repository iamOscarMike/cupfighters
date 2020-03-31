import React from 'react';
import Bracket from './Bracket';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Bracket', () => {
    const players = {
        ['player#1']: 'van Persie',
        ['player#2']: 'Kuyt',
        ['player#3']: 'Makaay',
        ['player#4']: 'Houtman',
        ['player#5']: 'Kindvall',
        ['player#6']: 'van der Gijp',
        ['player#7']: 'Moulijn',
        ['player#8']: 'Kalou',
    };

    const matches = {
        ['match#1']: { player1: 'player#1', player2: 'player#2', score1: 1, score2: 2 },
        ['match#2']: { player1: 'player#3', player2: 'player#4', score1: 2, score2: 2, throughOnPenalties: 'player#3' },
        ['match#3']: { player1: 'player#5', player2: 'player#6', score1: null, score2: null },
        ['match#4']: { player1: 'player#7', player2: 'player#8', score1: null, score2: null },
    };

    it('renders a bracket from quarter final', () => {
        const rounds = [{ matches: ['match#1', 'match#2', 'match#3', 'match#4'] }];
        const bracket = shallow(<Bracket matches={matches} players={players} rounds={rounds} />);

        expect(bracket.find('div.round-of-8').length).toEqual(2);
        expect(bracket.find('div.round-of-4').length).toEqual(2);
        expect(bracket.find('div.round-of-2').length).toEqual(1);

        expect(bracket.find('div.round-of-8').at(0).find('div.match').at(0).find('span.player').at(0).text()).toEqual('van Persie');
        expect(bracket.find('div.round-of-8').at(0).find('div.match').at(0).find('span.player').at(1).text()).toEqual('Kuyt');
        expect(bracket.find('div.round-of-8').at(0).find('div.match').at(0).find('input').at(0).props().value).toEqual(1);
        expect(bracket.find('div.round-of-8').at(0).find('div.match').at(0).find('input').at(1).props().value).toEqual(2);

        expect(bracket.find('div.round-of-8').at(0).find('div.match').at(1).find('span.player').at(0).text()).toEqual('Kindvall');
        expect(bracket.find('div.round-of-8').at(0).find('div.match').at(1).find('span.player').at(1).text()).toEqual('van der Gijp');

        expect(bracket.find('div.round-of-8').at(1).find('div.match').at(0).find('span.player').at(0).text()).toEqual('Makaay');
        expect(bracket.find('div.round-of-8').at(1).find('div.match').at(0).find('span.player').at(1).text()).toEqual('Houtman');
        expect(bracket.find('div.round-of-8').at(1).find('div.match').at(0).find('div.penalties').length).toEqual(1);

        expect(bracket.find('div.round-of-8').at(1).find('div.match').at(1).find('span.player').at(0).text()).toEqual('Moulijn');
        expect(bracket.find('div.round-of-8').at(1).find('div.match').at(1).find('span.player').at(1).text()).toEqual('Kalou');
    });

    it('renders a bracket from semi final', () => {
        const rounds = [{ matches: ['match#1', 'match#2'] }];
        const bracket = shallow(<Bracket matches={matches} players={players} rounds={rounds} />);
        expect(bracket.find('div.round-of-8').length).toEqual(0);
        expect(bracket.find('div.round-of-4').length).toEqual(2);
        expect(bracket.find('div.round-of-2').length).toEqual(1);

        expect(bracket.find('div.round-of-4').at(0).find('div.match').at(0).find('span.player').at(0).text()).toEqual('van Persie');
        expect(bracket.find('div.round-of-4').at(0).find('div.match').at(0).find('span.player').at(1).text()).toEqual('Kuyt');

        expect(bracket.find('div.round-of-4').at(1).find('div.match').at(0).find('span.player').at(0).text()).toEqual('Makaay');
        expect(bracket.find('div.round-of-4').at(1).find('div.match').at(0).find('span.player').at(1).text()).toEqual('Houtman');
    });

    it('renders a bracket from final', () => {
        const rounds = [{ matches: ['match#1'] }];
        const bracket = shallow(<Bracket matches={matches} players={players} rounds={rounds} />);
        expect(bracket.find('div.round-of-8').length).toEqual(0);
        expect(bracket.find('div.round-of-4').length).toEqual(0);
        expect(bracket.find('div.round-of-2').length).toEqual(1);

        expect(bracket.find('div.round-of-2').at(0).find('div.match').at(0).find('span.player').at(0).text()).toEqual('van Persie');
        expect(bracket.find('div.round-of-2').at(0).find('div.match').at(0).find('span.player').at(1).text()).toEqual('Kuyt');
    });
});
