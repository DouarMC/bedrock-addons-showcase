import { world, system, EntityInventoryComponent, ItemDurabilityComponent, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
export function startDurabilityViewer() {
    function updateItemLore(containerSlot) {
        const itemStack = containerSlot.getItem();
        if (itemStack === undefined)
            return;
        const itemDurabilityComponent = itemStack.getComponent(ItemDurabilityComponent.componentId);
        if (itemDurabilityComponent === undefined)
            return;
        const currentDurability = itemDurabilityComponent.maxDurability - itemDurabilityComponent.damage;
        containerSlot.setLore([`§eDurability: ${currentDurability} / ${itemDurabilityComponent.maxDurability}`]);
    }
    system.runInterval(() => {
        const players = world.getAllPlayers();
        for (const player of players) {
            const playerInventoryComponent = player.getComponent(EntityInventoryComponent.componentId);
            if (playerInventoryComponent) {
                const inventory = playerInventoryComponent.container;
                for (let i = 0; i < inventory.size; i++) {
                    updateItemLore(inventory.getSlot(i));
                }
            }
            const playerEquippableComponent = player.getComponent(EntityEquippableComponent.componentId);
            if (playerEquippableComponent) {
                for (const equippableSlot of Object.values(EquipmentSlot)) {
                    updateItemLore(playerEquippableComponent.getEquipmentSlot(equippableSlot));
                }
            }
        }
    });
}
