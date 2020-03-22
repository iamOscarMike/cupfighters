import { chunk, shuffle } from 'lodash';
import generateGroupMatches from './generateGroupMatches';

export default function (players, groupSize) {
    return chunk(shuffle(Object.keys(players)), groupSize).map((players) => ({
        players,
        matches: generateGroupMatches(players),
    }));
}