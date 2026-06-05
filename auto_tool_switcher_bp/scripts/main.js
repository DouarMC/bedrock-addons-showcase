import { EntityInventoryComponent, world } from "@minecraft/server";
/**
 * La liste des tags de blocs indiquant le type d'outil pour casser ces derniers
 */
const itemDestructibleBlockTags = [
    "minecraft:is_axe_item_destructible",
    "minecraft:is_hoe_item_destructible",
    "minecraft:is_pickaxe_item_destructible",
    "minecraft:is_shears_item_destructible",
    "minecraft:is_shovel_item_destructible",
    "minecraft:is_sword_item_destructible"
];
/**
 * Chaque tag de bloc destructible associé au tag d'item
 */
const blockTagToItemTag = {
    "minecraft:is_axe_item_destructible": "minecraft:is_axe",
    "minecraft:is_hoe_item_destructible": "minecraft:is_hoe",
    "minecraft:is_pickaxe_item_destructible": "minecraft:is_pickaxe",
    "minecraft:is_shears_item_destructible": "minecraft:is_shears",
    "minecraft:is_shovel_item_destructible": "minecraft:is_shovel",
    "minecraft:is_sword_item_destructible": "minecraft:is_sword"
};
// Quand un bloc commence à être cassé, le slot selectionné du joueur se mettra sur l'item pour casser le bloc s'il en existe
world.afterEvents.entityHitBlock.subscribe(eventData => {
    const { hitBlock } = eventData;
    const player = eventData.damagingEntity;
    // Récupère les tags du blocs
    const blockTags = hitBlock.getTags();
    let bestToolTag = undefined;
    // Récupère le tag d'item pour le meilleur outil
    for (const tag of itemDestructibleBlockTags) {
        if (blockTags.includes(tag)) {
            bestToolTag = blockTagToItemTag[tag];
            break;
        }
    }
    if (!bestToolTag)
        return;
    const playerInventoryComponent = player.getComponent(EntityInventoryComponent.componentId);
    // Pour chaque slot de l'hotbar du joueur, essaie de trouver l'item qui possède le tag et mais selectionne le slot correspondant
    for (let hotbarSlot = 0; hotbarSlot < 9; hotbarSlot++) {
        const item = playerInventoryComponent.container?.getItem(hotbarSlot);
        if (!item)
            continue;
        if (item.getTags().includes(bestToolTag)) {
            player.selectedSlotIndex = hotbarSlot;
            break;
        }
    }
}, { entityTypes: ["minecraft:player"] });
