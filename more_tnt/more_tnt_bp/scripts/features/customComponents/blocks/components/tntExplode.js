export const blockTntExplodeComponent = {
    onTick(eventData) {
        const moreTntBlock = eventData.block;
        const blockStates = moreTntBlock.permutation.getAllStates();
        const triggeredByExplosion = blockStates["douarmc_more_tnt:triggered_by_explosion"];
        moreTntBlock.dimension.spawnEntity(moreTntBlock.typeId, moreTntBlock.bottomCenter(), {
            spawnEvent: triggeredByExplosion ? "douarmc_more_tnt:from_explosion" : undefined
        });
        moreTntBlock.setType("minecraft:air");
    }
};
