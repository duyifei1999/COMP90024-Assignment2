import couchdb
import json
db_tweet_name = 'tweets'
db_address = "http://127.0.0.1:5984/"
db_server = couchdb.Server(db_address)
db_server.resource.credentials = ('admin', 'admin')
tweets=[]
file=open('tweets.json','w')
print(db_server)
for name in db_server:
    print(name)
for x in db_server['tweets']:
    tweets.append(db_server['tweets'][x])
initial=json.dumps(tweets)
file.write(initial)
