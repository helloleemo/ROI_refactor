import type { IconProps } from "../types";
import ThemedAssetIcon from "../ThemedAssetIcon";
import darkIcon from "../svg/N36x36SecondMenuDataImport.dark.svg";
import lightIcon from "../svg/N36x36SecondMenuDataImport.light.svg";

const N36x36SecondMenuDataImport = (props: IconProps) => {
    return (
        <ThemedAssetIcon
            {...props}
            alt="Data Import"
            lightSrc={lightIcon}
            darkSrc={darkIcon}
            defaultWidth={36}
            defaultHeight={36}
        />
    );
};

export default N36x36SecondMenuDataImport;
