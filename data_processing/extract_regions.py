import json
import sys

def extract_regions_from_file(filepath):
    with open(filepath, 'r') as file:
        data = json.load(file)
        extracted = []
        for f in data["features"]:
            # only want suburbs within the Melbourne region
            code = f["properties"]["SA2_MAIN16"][:3]
            if "206" <= code <= "214":
                extracted.append(f)

        return extracted

def output_geoJson(extracted):
    geoJson = {}
    geoJson["type"] = "FeatureCollection"
    geoJson["features"] = extracted;
    return geoJson;

if __name__ == "__main__":
    try:
        filepath = sys.argv[1]
        extracted = extract_regions_from_file(filepath)
        json.dump(output_geoJson(extracted), open("output.json", "w"))
    except:
        print("Usage: python extract_regions.py <filepath>")
