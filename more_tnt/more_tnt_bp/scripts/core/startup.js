import { system } from "@minecraft/server";
import { registerCustomCommands } from "../features/customCommands/index";
import { registerBlockCustomComponents, registerItemCustomComponents } from "../features/customComponents/index";
/**
 * Appelée une seule fois avant que le monde ne soit chargé. Très peu d'APIs du jeu sont disponibles à ce moment.
 * Idéal pour :
 * - enregistrer des commandes
 * - enregistrer des composants custom
 * - inscirire des events
 */
export function initStartup() {
    system.beforeEvents.startup.subscribe((eventData) => {
        // Enregistrement des commandes personnalisées et enums de commandes
        registerCustomCommands(eventData.customCommandRegistry);
        // Enregistrement des composants personnalisés des blocs
        registerBlockCustomComponents(eventData.blockComponentRegistry);
        // Enregistrement des composants personnalisés des items
        registerItemCustomComponents(eventData.itemComponentRegistry);
    });
}
