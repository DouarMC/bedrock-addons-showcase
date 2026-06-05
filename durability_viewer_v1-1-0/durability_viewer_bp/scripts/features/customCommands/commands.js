import { CommandPermissionLevel, CustomCommandParamType } from "@minecraft/server";
import { displayDurabilityHandler } from "./handlers";
export const commandDefinitions = [
    {
        command: {
            name: "douarmc_durability_viewer:displaydurability",
            description: "Display the durability of items in your inventory",
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            mandatoryParameters: [
                {
                    name: "players",
                    type: CustomCommandParamType.PlayerSelector
                },
                {
                    name: "enabled",
                    type: CustomCommandParamType.Boolean
                }
            ]
        },
        handler: displayDurabilityHandler
    }
];
