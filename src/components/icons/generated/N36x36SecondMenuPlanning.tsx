import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuPlanning.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuPlanning.light.svg";

const N36x36SecondMenuPlanning = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Planning"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuPlanning;
