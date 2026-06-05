import { world } from "@minecraft/server";
import { registerMoreTntActivationFeatures } from "../features/moreTntActivation/index";
import { registerMoreTntExplosionBehaviors } from "../features/moreTntExplosionBehaviors/index";
/**
 * Appelée une seule fois après que le monde soit chargé. C'est à ce moment que toutes les APIs du jeu sont disponibles.
 */
export function initWorld() {
    world.afterEvents.worldLoad.subscribe(() => {
        registerMoreTntActivationFeatures();
        registerMoreTntExplosionBehaviors();
    });
}
