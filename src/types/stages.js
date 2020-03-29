const stages = Object.freeze({
    start: 'start',
    setup: 'setup',
    groupStage: 'groupStage',
    knockoutStage: 'knockoutStage',
    finished: 'finished',
});

const stageOrder = [
    stages.start,
    stages.setup,
    stages.groupStage,
    stages.knockoutStage,
    stages.finished,
]

function fetchNextStage(currentStage) {
    const i = stageOrder.indexOf(currentStage);
    return stageOrder[i + 1] != null && stageOrder[i + 1];
}

function canSeeStage(stage, currentStage) {
    return stageOrder.indexOf(currentStage) >= stageOrder.indexOf(stage);
}

export { stages, fetchNextStage, canSeeStage };