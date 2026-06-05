import { blockTntExplodeComponent } from "./components/tntExplode";
import { blockTriggerTntWhenRedstonePoweredComponent } from "./components/triggerTntWhenRedstonePowered";
export const blockComponentDefinitions = [
    {
        name: "douarmc_more_tnt:trigger_tnt_when_redstone_powered",
        customComponent: blockTriggerTntWhenRedstonePoweredComponent
    },
    {
        name: "douarmc_more_tnt:tnt_explode",
        customComponent: blockTntExplodeComponent
    }
];
