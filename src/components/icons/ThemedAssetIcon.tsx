import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import type { IconProps } from "./types";

type ThemedAssetIconProps = IconProps & {
    lightSrc: string;
    darkSrc: string;
    alt: string;
    defaultWidth: number;
    defaultHeight: number;
};

const svgTextCache = new Map<string, string>();

const ThemedAssetIcon = ({
    width,
    height,
    accentColor,
    lightSrc,
    darkSrc,
    alt,
    defaultWidth,
    defaultHeight,
}: ThemedAssetIconProps) => {
    const theme = useTheme();
    const src = theme.palette.mode === "dark" ? darkSrc : lightSrc;
    const [svgText, setSvgText] = useState<string | null>(null);
    const resolvedAccentColor = accentColor
        ? accentColor.split(".").reduce<unknown>((currentValue, key) => {
            if (currentValue && typeof currentValue === "object" && key in currentValue) {
                return (currentValue as Record<string, unknown>)[key];
            }

            return undefined;
        }, theme.palette as unknown)
        : undefined;

    useEffect(() => {
        if (typeof resolvedAccentColor !== "string") {
            return;
        }

        const cachedSvgText = svgTextCache.get(src);
        if (cachedSvgText) {
            setSvgText(cachedSvgText);
            return;
        }

        let isActive = true;

        fetch(src)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load svg asset");
                }

                return response.text();
            })
            .then((text) => {
                svgTextCache.set(src, text);
                if (isActive) {
                    setSvgText(text);
                }
            })
            .catch(() => {
                if (isActive) {
                    setSvgText(null);
                }
            });

        return () => {
            isActive = false;
        };
    }, [resolvedAccentColor, src]);

    const coloredSvgMarkup = useMemo(() => {
        if (typeof resolvedAccentColor !== "string" || !svgText) {
            return null;
        }

        return svgText.replace(/currentColor/g, resolvedAccentColor);
    }, [resolvedAccentColor, svgText]);

    if (typeof resolvedAccentColor === "string" && coloredSvgMarkup) {
        return (
            <span
                aria-label={alt}
                role="img"
                style={{
                    display: "block",
                    width: width ?? defaultWidth,
                    height: height ?? defaultHeight,
                    lineHeight: 0,
                }}
                dangerouslySetInnerHTML={{ __html: coloredSvgMarkup }}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width ?? defaultWidth}
            height={height ?? defaultHeight}
            style={{ display: "block" }}
        />
    );
};

export default ThemedAssetIcon;
