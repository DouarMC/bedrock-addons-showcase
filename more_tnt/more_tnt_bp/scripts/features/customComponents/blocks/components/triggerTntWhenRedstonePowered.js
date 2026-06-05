import { BlockPermutation } from "@minecraft/server";
export const blockTriggerTntWhenRedstonePoweredComponent = {
    onTick(eventData) {
        const moreTntBlock = eventData.block;
        const redstonePower = moreTntBlock.getRedstonePower();
        if (redstonePower && redstonePower > 0) {
            const blockStates = moreTntBlock.permutation.getAllStates();
            blockStates["douarmc_more_tnt:explode_bit"] = true;
            moreTntBlock.setPermutation(BlockPermutation.resolve(moreTntBlock.typeId, blockStates));
        }
    }
};
