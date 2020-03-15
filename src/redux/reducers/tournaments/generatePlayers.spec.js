import generatePlayers from './generatePlayers';

describe('generatePlayers', () => {
    it('generates an object for all players with unique ids', () => {
        const playerNames = ['van Persie', 'Kuyt', 'Makaay'];
        const players = generatePlayers(playerNames);
        const playerIds = Object.keys(players);
        expect(playerIds.length).toEqual(3);
        playerIds.forEach((id) => {
            expect(id).toMatch(/player#([0-9]{8})/);
        });
        playerNames.forEach((name) => {
            expect(Object.values(players)).toContain(name);
        });
    });
});