import { blockComponentDefinitions } from "./blocks/definitions";
import { itemComponentDefinitions } from "./items/definitions";
export function registerBlockCustomComponents(registry) {
    try {
        // Enregistrement des composants personnalisés des blocs
        let componentsRegistered = 0;
        for (const componentDefinition of blockComponentDefinitions) {
            registry.registerCustomComponent(componentDefinition.name, componentDefinition.customComponent);
            componentsRegistered++;
        }
        console.log(`[STARTUP] ${componentsRegistered} block custom components registered successfully.`);
    }
    catch (error) {
        console.error(`Error registering block custom components: ${error}`);
        throw error;
    }
}
export function registerItemCustomComponents(registry) {
    try {
        // Enregistrement des composants personnalisés des items
        let componentsRegistered = 0;
        for (const componentDefinition of itemComponentDefinitions) {
            registry.registerCustomComponent(componentDefinition.name, componentDefinition.customComponent);
            componentsRegistered++;
        }
        console.log(`[STARTUP] ${componentsRegistered} item custom components registered successfully.`);
    }
    catch (error) {
        console.error(`Error registering item custom components: ${error}`);
        throw error;
    }
}
