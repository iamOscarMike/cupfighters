import { stages, fetchNextStage, canSeeStage } from './stages';

describe('stages', () => {
    it('fetchNextStage fetches the next stage for the given stage', () => {
        expect(fetchNextStage(stages.start)).toEqual(stages.setup);
    });
    
    it('fetchNextStage returns false if the given state is the last', () => {
        expect(fetchNextStage(stages.finished)).toEqual(false);
    });

    it('tests it can see the group stage', () => {
        expect(canSeeStage(stages.start, stages.groupStage)).toEqual(true);
        expect(canSeeStage(stages.setup, stages.groupStage)).toEqual(true);
        expect(canSeeStage(stages.groupStage, stages.groupStage)).toEqual(true);
        expect(canSeeStage(stages.knockoutStage, stages.groupStage)).toEqual(false);
        expect(canSeeStage(stages.finished, stages.groupStage)).toEqual(false);
    });

    it('tests it can see the knockout stage', () => {
        expect(canSeeStage(stages.start, stages.knockoutStage)).toEqual(true);
        expect(canSeeStage(stages.setup, stages.knockoutStage)).toEqual(true);
        expect(canSeeStage(stages.groupStage, stages.knockoutStage)).toEqual(true);
        expect(canSeeStage(stages.knockoutStage, stages.knockoutStage)).toEqual(true);
        expect(canSeeStage(stages.finished, stages.knockoutStage)).toEqual(false);
    });

    it('tests it can see the finished stage', () => {
        expect(canSeeStage(stages.start, stages.finished)).toEqual(true);
        expect(canSeeStage(stages.setup, stages.finished)).toEqual(true);
        expect(canSeeStage(stages.groupStage, stages.finished)).toEqual(true);
        expect(canSeeStage(stages.knockoutStage, stages.finished)).toEqual(true);
        expect(canSeeStage(stages.finished, stages.finished)).toEqual(true);
    });
});
