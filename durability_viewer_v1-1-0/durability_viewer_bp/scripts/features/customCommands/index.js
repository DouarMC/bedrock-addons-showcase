import { commandEnums } from "./enums";
import { commandDefinitions } from "./commands";
export function registerCustomCommands(registry) {
    try {
        // Enregistrement des enums de commandes
        let enumsRegistered = 0;
        for (const [enumKey, enumData] of Object.entries(commandEnums)) {
            registry.registerEnum(enumKey, enumData.values);
            enumsRegistered++;
        }
        console.log(`[STARTUP] ${enumsRegistered} command enums registered successfully.`);
        // Enregistrement des commandes personnalisées
        let commandsRegistered = 0;
        for (const commandDefinition of commandDefinitions) {
            registry.registerCommand(commandDefinition.command, commandDefinition.handler);
            commandsRegistered++;
        }
        console.log(`[STARTUP] ${commandsRegistered} custom commands registered successfully.`);
    }
    catch (error) {
        console.error(`Error registering custom commands: ${error}`);
        throw error;
    }
}
