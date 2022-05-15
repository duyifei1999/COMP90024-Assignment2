import couchdb
import json

db_server = couchdb.Server("http://127.0.0.1:5984/")
db_server.resource.credentials = ('XXXX', 'XXXX')
#create database in couchdb before running this code
db = db_server["old_twitters"]

with open("target/target_list_"+str(num)+".json",encoding='UTF-8') as jsonfile:
	while (True):
		new_line = jsonfile.readline()
		if not new_line:
                break;
        new_json = json.loads(new_line)
        db.save(new_json)