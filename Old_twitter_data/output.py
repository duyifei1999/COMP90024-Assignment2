#output the json from couchdb into a new json file
for x in db:
    with open('twitters.json', 'a+', encoding='utf-8') as f:
        line_json = db[x]
        del line_json["_id"]
        del line_json["_rev"]
        line = json.dumps(line_json, ensure_ascii=False)
        f.write(line+'\n')