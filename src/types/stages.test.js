import { stages, fetchNextStage } from './stages';

describe('stages', () => {
    it('fetchNextStage fetches the next stage for the given stage', () => {
        expect(fetchNextStage(stages.start)).toEqual(stages.setup);
    });
    
    it('fetchNextStage returns false if the given state is the last', () => {
        expect(fetchNextStage(stages.finished)).toEqual(false);
    });
});
