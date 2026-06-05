import { world, system, BlockPermutation, EntityOnFireComponent, GameRule } from "@minecraft/server";
import { tntActivationItems } from "../../utils/datas";
function igniteMoreTntOnPlayerInteract(eventData) {
    if (eventData.isFirstEvent === false)
        return;
    const { block: moreTntBlock, itemStack } = eventData;
    if (moreTntBlock.hasTag("douarmc_more_tnt:more_tnt") === false)
        return;
    if (itemStack === undefined)
        return;
    if (tntActivationItems.includes(itemStack.typeId) === false)
        return;
    eventData.cancel = true;
    const blockStates = moreTntBlock.permutation.getAllStates();
    blockStates["douarmc_more_tnt:explode_bit"] = true;
    const newPermutation = BlockPermutation.resolve(moreTntBlock.typeId, blockStates);
    system.run(() => {
        moreTntBlock.setPermutation(newPermutation);
        moreTntBlock.dimension.playSound("random.fuse", moreTntBlock.bottomCenter(), { volume: 1, pitch: 1 });
    });
}
function igniteMoreTntOnExplosion(eventData) {
    const impactedBlocks = eventData.getImpactedBlocks();
    const moreTntBlocks = impactedBlocks.filter(block => block.hasTag("douarmc_more_tnt:more_tnt"));
    eventData.setImpactedBlocks(impactedBlocks.filter(block => !block.hasTag("douarmc_more_tnt:more_tnt")));
    for (const moreTntBlock of moreTntBlocks) {
        const newPermutation = BlockPermutation.resolve(moreTntBlock.typeId, {
            "douarmc_more_tnt:explode_bit": true,
            "douarmc_more_tnt:triggered_by_explosion": true
        });
        system.run(() => {
            moreTntBlock.setPermutation(newPermutation);
        });
    }
}
function igniteMoreTntOnProjectileHit(eventData) {
    const { projectile } = eventData;
    const moreTntBlock = eventData.getBlockHit().block;
    if (moreTntBlock.hasTag("douarmc_more_tnt:more_tnt") === false)
        return;
    const projectileOnFireComponent = projectile.getComponent(EntityOnFireComponent.componentId);
    if (projectileOnFireComponent === undefined)
        return;
    const blockStates = moreTntBlock.permutation.getAllStates();
    blockStates["douarmc_more_tnt:explode_bit"] = true;
    const newPermutation = BlockPermutation.resolve(moreTntBlock.typeId, blockStates);
    moreTntBlock.setPermutation(newPermutation);
}
function toggleMoreTntActivationFeaturesOnTntExplodesGameRuleChange(eventData) {
    const { rule, value } = eventData;
    if (rule !== GameRule.TntExplodes)
        return;
    toggleMoreTntActivationFeatures(value);
}
function toggleMoreTntActivationFeatures(value) {
    if (value === false) {
        world.beforeEvents.playerInteractWithBlock.unsubscribe(igniteMoreTntOnPlayerInteract);
        world.beforeEvents.explosion.unsubscribe(igniteMoreTntOnExplosion);
        world.afterEvents.projectileHitBlock.unsubscribe(igniteMoreTntOnProjectileHit);
    }
    else if (value === true) {
        world.beforeEvents.playerInteractWithBlock.subscribe(igniteMoreTntOnPlayerInteract);
        world.beforeEvents.explosion.subscribe(igniteMoreTntOnExplosion);
        world.afterEvents.projectileHitBlock.subscribe(igniteMoreTntOnProjectileHit);
    }
}
export function registerMoreTntActivationFeatures() {
    const tntExplodesGameRuleValue = world.gameRules.tntExplodes;
    toggleMoreTntActivationFeatures(tntExplodesGameRuleValue);
    world.afterEvents.gameRuleChange.subscribe(toggleMoreTntActivationFeaturesOnTntExplodesGameRuleChange);
}
