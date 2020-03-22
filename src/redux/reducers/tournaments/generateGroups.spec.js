import generateGroups from './generateGroups';

describe('generateGroups', () => {
    it('generates groups', () => {
        const groups = generateGroups({
            ['player#123']: 'van Persie',
            ['player#234']: 'Kuyt',
            ['player#345']: 'Makaay',
            ['player#456']: 'Houtman',
            ['player#567']: 'Kindvall',
            ['player#678']: 'van der Gijp',
            ['player#789']: 'Moulijn',
            ['player#890']: 'Kalou',
        }, 4);
        
        expect(groups.length).toEqual(2);

        expect(groups[0].players.length).toEqual(4);
        expect(groups[0].matches.length).toEqual(6);
        
        expect(groups[1].players.length).toEqual(4);
        expect(groups[1].matches.length).toEqual(6);
    });
});