export default function generateNextKnockoutRound(previousRound, matches) {
    const winners = previousRound.matches.map((matchId) => {
        const match = matches[matchId];
        if (match.score1 > match.score2) {
            return match.player1;
        } else if (match.score2 > match.score1) {
            return match.player2;
        }
        return match.throughOnPenalties;
    });

    const newMatches = [];
    if (winners.length > 2) {
        const left = [...winners.filter((winner, index) => index % 2 === 0)];
        const right = [...winners.filter((winner, index) => !(index % 2 === 0))];

        while (left.length > 0) {
            newMatches.push(
                { player1: left.shift(), player2: left.shift(), score1: null, score2: null },
                { player1: right.shift(), player2: right.shift(), score1: null, score2: null }
            );
        }
    } else if (winners.length === 2) {
        newMatches.push({ player1: winners[0], player2: winners[1], score1: null, score2: null });
    }

    return newMatches;
}