import { useTheme, type Theme } from "@mui/material/styles";
import type { IconProps } from "./types";

type ThemedAssetIconProps = IconProps & {
    lightSrc: string;
    darkSrc: string;
    // 單色線稿圖示才需要提供，才能在套用主題色時改色
    lightRaw?: string;
    darkRaw?: string;
    alt: string;
    defaultWidth: number;
    defaultHeight: number;
    forceMode?: "light" | "dark";
};

const resolveAccentColor = (theme: Theme, accentColor?: string) => {
    if (!accentColor) {
        return undefined;
    }

    return accentColor.split(".").reduce<unknown>((currentValue, key) => {
        if (currentValue && typeof currentValue === "object" && key in currentValue) {
            return (currentValue as Record<string, unknown>)[key];
        }

        return undefined;
    }, theme.palette as unknown) as string | undefined;
};


const recolorSvgMarkup = (markup: string, color: string) => {
    return markup
        .replace(/<svg\b([^>]*)>/, (_match, attributes: string) => {
            const sanitizedAttributes = attributes
                .replace(/\swidth="[^"]*"/i, "")
                .replace(/\sheight="[^"]*"/i, "");

            return `<svg${sanitizedAttributes} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
        })
        .replace(/(fill|stroke)="(#[0-9a-fA-F]{3,8}|currentColor)"/g, `$1="${color}"`);
};

const toSvgDataUri = (markup: string) => `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;

const ThemedAssetIcon = ({
    width,
    height,
    accentColor,
    lightSrc,
    darkSrc,
    lightRaw,
    darkRaw,
    alt,
    defaultWidth,
    defaultHeight,
    forceMode,
}: ThemedAssetIconProps) => {
    const theme = useTheme();
    const effectiveMode = forceMode ?? (theme.palette.mode === "dark" ? "dark" : "light");
    const src = effectiveMode === "dark" ? darkSrc : lightSrc;
    const rawMarkup = effectiveMode === "dark" ? darkRaw : lightRaw;
    const resolvedAccentColor = resolveAccentColor(theme, accentColor);
    const finalWidth = width ?? defaultWidth;
    const finalHeight = height ?? defaultHeight;

    const finalSrc = resolvedAccentColor && rawMarkup
        ? toSvgDataUri(recolorSvgMarkup(rawMarkup, resolvedAccentColor))
        : src;

    return (
        <img
            src={finalSrc}
            alt={alt}
            width={finalWidth}
            height={finalHeight}
            style={{ display: "block" }}
        />
    );
};

export default ThemedAssetIcon;
