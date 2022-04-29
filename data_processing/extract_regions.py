import json
import sys

def extract_regions_from_file(filepath):
    data = json.load(open(filepath, 'r'))
    extracted = []
    for f in data["features"]:
        # only want regions within Melbourne region
        code = f["properties"]["sa2_code"][:3]
        if "206" <= code <= "213":
            region = {}
            region["type"] = "Feature"
            region["geometry"] = f["geometry"]
            region["properties"] = {}
            region["properties"]["sa2_code"] = f["properties"]["sa2_code"]
            # region["properties"]["sa2_5dig11"] = f["properties"]["sa2_5dig11"]
            region["properties"]["sa2_name"] = f["properties"]["sa2_name"]
            extracted.append(region)

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
