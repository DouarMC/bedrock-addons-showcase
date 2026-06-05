import { world, system } from "@minecraft/server";
import { replaceableBlocksByMoreTntEffect } from "../../utils/datas";
export function replaceBlocksWithDiamondOnDiamondExplosiveExplode(eventData) {
    const { source: diamondExplosiveEntity } = eventData;
    if (diamondExplosiveEntity === undefined)
        return;
    if (diamondExplosiveEntity.matches({ families: ["douarmc_more_tnt:diamond_explosive"] })) {
        const impactedBlocks = eventData.getImpactedBlocks();
        const impactedReplaceableBlocks = impactedBlocks.filter((block) => replaceableBlocksByMoreTntEffect.includes(block.typeId));
        eventData.setImpactedBlocks([]);
        for (const block of impactedReplaceableBlocks) {
            system.run(() => {
                block.setType("minecraft:diamond_block");
            });
        }
    }
}
export function replaceBlocksWithIceOnIceExplosiveExplode(eventData) {
    const { source: iceExplosiveEntity } = eventData;
    if (iceExplosiveEntity === undefined)
        return;
    if (iceExplosiveEntity.matches({ families: ["douarmc_more_tnt:ice_explosive"] })) {
        const impactedBlocks = eventData.getImpactedBlocks();
        const impactedReplaceableBlocks = impactedBlocks.filter((block) => replaceableBlocksByMoreTntEffect.includes(block.typeId));
        eventData.setImpactedBlocks([]);
        for (const block of impactedReplaceableBlocks) {
            const randomValue = Math.random();
            system.run(() => {
                if (randomValue < 0.5) {
                    block.setType("minecraft:ice");
                }
                else if (randomValue < 0.85) {
                    block.setType("minecraft:packed_ice");
                }
                else {
                    block.setType("minecraft:blue_ice");
                }
            });
        }
    }
}
export function summonLightningOnLightningExplosiveExplode(eventData) {
    const { source: lightningExplosiveEntity } = eventData;
    if (lightningExplosiveEntity === undefined)
        return;
    if (lightningExplosiveEntity.matches({ families: ["douarmc_more_tnt:lightning_explosive"] })) {
        const impactedBlocks = eventData.getImpactedBlocks();
        const count = Math.min(10, impactedBlocks.length);
        for (let i = 0; i < count; i++) {
            const blockChoosen = impactedBlocks[Math.floor(Math.random() * impactedBlocks.length)];
            system.run(() => {
                blockChoosen.dimension.spawnEntity("minecraft:lightning_bolt", blockChoosen.location);
            });
        }
    }
}
export function registerMoreTntExplosionBehaviors() {
    // Remplace les blocs impactés par une entité explosive de diamant par des blocs de diamant
    world.beforeEvents.explosion.subscribe(replaceBlocksWithDiamondOnDiamondExplosiveExplode);
    // Remplace les blocs impactés par une entité explosive de glace par des blocs de glace, glace compactée ou glace bleue
    world.beforeEvents.explosion.subscribe(replaceBlocksWithIceOnIceExplosiveExplode);
    // Fait apparaître des éclairs sur des blocs impactés par une entité explosive de foudre
    world.beforeEvents.explosion.subscribe(summonLightningOnLightningExplosiveExplode);
}
