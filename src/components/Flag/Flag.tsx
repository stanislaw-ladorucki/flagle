import Country from "../../constants/country.ts";

// @ts-ignore
export default function Flag({country, width, height, rows = 1, cols = 1}: {
    country: Country, width?: number, height?: number, rows: number, cols: number
}) {
    function getFlagImageUrl(country: Country) {
        return `https://flagcdn.com/${country.toLowerCase()}.svg`;
    }

    // TODO: add revealing tiles
    return <div className="flag mb-3">
        <img src={getFlagImageUrl(country)} width={width} height={height} alt="" className="img-fluid img-thumbnail"/>
    </div>
}
