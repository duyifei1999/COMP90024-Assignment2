import couchdb
import json
from textblob import TextBlob
from data_processing.spatial import SpatialTool
tool = SpatialTool()
tool.load_region_info("data_processing/sa2.json")
db_tweet_name = 'housing'
db_address = "http://localhost:5984/"
db_server = couchdb.Server(db_address)
db_server.resource.credentials = ('admin', 'admin')
tweets=[]
file=open('housing.json','w')
print(db_server)
for name in db_server:
    print(name)


'''del db_server['housing']
db_tweets=db_server['tweets_housing']
for x in db_server['tweets']:
    data_json=db_server['tweets'][x]
    del data_json['_id']
    del data_json['_rev']
    if db_server['tweets'][x]['geo']!=None and db_server['tweets'][x]['geo']!={}:
        coord=[]
        coord.append((data_json['geo']['geo']['bbox'][0]+data_json['geo']['geo']['bbox'][2])/2)
        coord.append((data_json['geo']['geo']['bbox'][1]+data_json['geo']['geo']['bbox'][3])/2)
        place=tool.locate(coords=coord)                    
        if place !='outside melbourne':
                                data_json['sa2']=place
                                text=data_json['text']
                                blob = TextBlob(text)
                                value = blob.sentiment.polarity
                                data_json['sentiment']=value
                                db_tweets.save(data_json)
'''
for x in db_server['housing']:
    tweets.append(db_server['housing'][x])
initial=json.dumps(tweets)
file.write(initial)    
