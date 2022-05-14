#Spatial.py function
import json
from shapely.geometry import Point, Polygon, MultiPolygon

class SpatialTool:
    regions = {};
    
    def load_region_info(self, filepath):
        with open(filepath, "r") as f:
            for f in json.load(f)["features"]:
                if f["geometry"]["type"] == "Polygon":
                    for polygon in f["geometry"]["coordinates"]:
                        self.regions[f["properties"]["SA2_MAIN16"]] = \
                            Polygon([tuple(p) for p in polygon])
                else:
                    for multi_polygon in f["geometry"]["coordinates"]:
                        self.regions[f["properties"]["SA2_MAIN16"]] = \
                            MultiPolygon([Polygon([tuple(p) for p in polygon]) for polygon in multi_polygon])

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

#load the couchdb
import couchdb
import json
import re
from textblob import TextBlob

#change to the real situation
db_server = couchdb.Server("http://127.0.0.1:5984/")
db_server.resource.credentials = ('XXXX', 'XXXX')
#create database in couchdb before running this code
db = db_server["old_twitters"]

tool = SpatialTool()
tool.load_region_info("SA2_2016_MELB.json");

#add json to database
#only add the json in melbourne
for num in range(1,14):
    with open("target/target_list_"+str(num)+".json",encoding='UTF-8') as jsonfile:
        while (True):
            new_line = jsonfile.readline()
            if not new_line:
                break;
            new_json = json.loads(new_line[:-2])
            if (new_json["doc"]["geo"] != None):
                coord_rev = new_json["doc"]["geo"]["coordinates"]
                coord = [coord_rev[1],coord_rev[0]]
                loc_code = tool.locate(coord)
                if (loc_code != "outside melbourne"):
                    new_json.update({"loc_code":loc_code})
                    text = new_json["doc"]["text"]
                    blob = TextBlob(text)
                    value = blob.sentiment.polarity
                    new_json.update({"text_value":value})
                    db.save(new_json)
            elif(new_json["doc"]["place"] != None):
                coord_list = new_json["doc"]["place"]["bounding_box"]["coordinates"][0]
                coord_x = (coord_list[0][0]+coord_list[1][0])/2
                coord_y = (coord_list[0][1]+coord_list[2][1])/2
                coord = [coord_x,coord_y]
                loc_code = tool.locate(coord)
                if (loc_code != "outside melbourne"):
                    new_json.update({"loc_code":loc_code})
                    text = new_json["doc"]["text"]
                    blob = TextBlob(text)
                    value = blob.sentiment.polarity
                    new_json.update({"text_value":value})
                    db.save(new_json)