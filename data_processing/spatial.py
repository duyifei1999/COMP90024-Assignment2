import json
from shapely.geometry import Point, Polygon, MultiPolygon

def main():

    tool = SpatialTool()
    tool.load_region_info("sa2.json");

    print("data from assignment 1\n")
    tweets = prepare_tweets();
    for t in tweets:
        coord = t["doc"]["coordinates"]["coordinates"]
        print(coord)
        print(tool.locate(coord))

    print("\ndata for testing\n")
    coords = [[144.98612887599475, -37.764432171690665], [144.90837224601452, -37.75982712869952], [144.9219292006105, -37.825349797919344], [145.1127864874854, -37.792401682684954]]
    for coord in coords:
        print(coord)
        print(tool.locate(coord))

class SpatialTool:
    regions = {};
    
    def load_region_info(self, filepath):
        with open("sa2.json", "r") as f:
            for f in json.load(f)["features"]:
                for multipolygon in f["geometry"]["coordinates"]:
                    self.regions[f["properties"]["sa2_code"]] = \
                        MultiPolygon([Polygon([tuple(p) for p in polygon]) for polygon in multipolygon])

    def locate(self, coords):
        """
            Given <tweet["doc"]["coordinates"]["coordinates"]>, 
            return the sa2_code of its corresponding region
            or "outside melbourne"
        """
        for k, v in self.regions.items():
            if (v.contains(Point(coords[0], coords[1]))):
                return k
        return "outside melbourne"


def prepare_tweets():
    tweets = []

    # temporarily use data from ass1 for development
    with open("smallTwitter.json", "r") as f:
        tinyTwitter = json.load(f)

        for t in tinyTwitter["rows"]:
            # doesn't have coord info, ignore
            if (t["doc"].get("coordinates", False)):
                tweets.append(t)

    return tweets



if __name__ == "__main__":
    main();