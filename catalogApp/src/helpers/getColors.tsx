import ImageColors from "react-native-image-colors";

export const getImageColors = async (uri: string) => {

    const colors = await ImageColors.getColors(uri, { fallback: "#000000" });

    let primary;
    let secundary;

    if (colors.platform === 'android') {
        // Access android properties
        // e.g.
        primary = colors.dominant;
        secundary = colors.average;
        // const averageColor = colors.average
    } else {
        // Access iOS properties
        // e.g.
        primary = colors.primary;
        secundary = colors.secondary;
        // const backgroundColor = colors.background
    }

    return [primary, secundary]
}