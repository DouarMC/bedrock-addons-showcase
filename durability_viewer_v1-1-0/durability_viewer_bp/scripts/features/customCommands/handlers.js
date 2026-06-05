import { CustomCommandStatus, system } from "@minecraft/server";
export const displayDurabilityHandler = (origin, ...args) => {
    const players = args[0];
    const enabled = args[1];
    for (const player of players) {
        system.run(() => {
            player.setDynamicProperty("douarmc_durability_viewer:durability_enabled", enabled);
        });
    }
    return {
        status: CustomCommandStatus.Success
    };
};
