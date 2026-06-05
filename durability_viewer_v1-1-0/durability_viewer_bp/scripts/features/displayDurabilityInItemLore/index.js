import { world, system, EntityInventoryComponent, ItemDurabilityComponent, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
function updateItemLore(containerSlot, durabilityEnabled) {
    const itemStack = containerSlot.getItem();
    if (itemStack === undefined)
        return;
    const itemDurabilityComponent = itemStack.getComponent(ItemDurabilityComponent.componentId);
    if (itemDurabilityComponent === undefined)
        return;
    if (durabilityEnabled === true) {
        const currentDurability = itemDurabilityComponent.maxDurability - itemDurabilityComponent.damage;
        const rawDurabilityLore = {
            translate: "douarmc.durability_viewer.scripts.lore.durability",
            with: [currentDurability.toString(), itemDurabilityComponent.maxDurability.toString()]
        };
        const currentLore = containerSlot.getRawLore();
        const durabilityLineIndex = currentLore.findIndex(loreLine => loreLine.translate === "douarmc.durability_viewer.scripts.lore.durability");
        if (durabilityLineIndex === -1) {
            currentLore.push(rawDurabilityLore);
        }
        else {
            currentLore[durabilityLineIndex] = rawDurabilityLore;
        }
        containerSlot.setLore(currentLore);
    }
    else {
        const rawLore = containerSlot.getRawLore();
        if (rawLore.length === 0)
            return;
        const filteredLore = rawLore.filter(loreLine => loreLine.translate !== "douarmc.durability_viewer.scripts.lore.durability");
        containerSlot.setLore(filteredLore);
    }
}
function addDurabilityInItemLoreForAllPlayers() {
    const players = world.getAllPlayers();
    for (const player of players) {
        const durabilityEnabled = player.getDynamicProperty("douarmc_durability_viewer:durability_enabled");
        const playerInventoryComponent = player.getComponent(EntityInventoryComponent.componentId);
        if (playerInventoryComponent) {
            const inventory = playerInventoryComponent.container;
            for (let i = 0; i < inventory.size; i++) {
                updateItemLore(inventory.getSlot(i), durabilityEnabled);
            }
        }
        const playerEquippableComponent = player.getComponent(EntityEquippableComponent.componentId);
        if (playerEquippableComponent) {
            for (const equippableSlot of Object.values(EquipmentSlot)) {
                updateItemLore(playerEquippableComponent.getEquipmentSlot(equippableSlot), durabilityEnabled);
            }
        }
    }
}
function setDurabilityEnabledDynamicPropertyOnPlayerFirstSpawn(eventData) {
    const { initialSpawn, player } = eventData;
    if (initialSpawn !== true)
        return;
    const dynamicProperties = player.getDynamicPropertyIds();
    if (dynamicProperties.includes("douarmc_durability_viewer:durability_enabled") === true)
        return;
    player.setDynamicProperty("douarmc_durability_viewer:durability_enabled", true);
}
export function registerDisplayDurabilityInItemLoreFeatures() {
    // Met la propriété dynamique "douarmc_durability_viewer:durability_enabled" à true aux joueurs qui spawnent pour la première fois
    world.afterEvents.playerSpawn.subscribe(setDurabilityEnabledDynamicPropertyOnPlayerFirstSpawn);
    // Met la durabilité dans le lore des items toutes les secondes des joueuers
    system.runInterval(addDurabilityInItemLoreForAllPlayers);
}
