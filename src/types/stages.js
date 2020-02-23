const stages = Object.freeze({
    start: 'start',
    setup: 'setup',
    groupStage: 'groupStage',
    knockoutStage: 'knockOutStage',
    finished: 'finished',
});

const stageOrder = [
    stages.start,
    stages.setup,
    stages.groupStage,
    stages.knockoutStage,
    stages.finished,
]

const fetchNextStage = (currentStage) => {
    const i = stageOrder.indexOf(currentStage);
    return stageOrder[i + 1] != null && stageOrder[i + 1];
}

export { stages, fetchNextStage };