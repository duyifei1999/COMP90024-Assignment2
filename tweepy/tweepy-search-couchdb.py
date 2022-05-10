import os
import json
from tweepy import Client
import couchdb
file = open('search_housing.json', 'w')

ls=[]
ls2=[]
if __name__ == "__main__":
    bearer_token = os.getenv("TWITTER_BEARER_TOKEN").strip('\r')

    if not bearer_token:
        raise RuntimeError("Not found bearer token")

    client = Client(bearer_token)


    db_tweet_name = 'tweets'
    db_address = "http://127.0.0.1:5984/"
    db_server = couchdb.Server(db_address)
    db_server.resource.credentials = ('admin', 'admin')
    print(db_server)
    if db_tweet_name in db_server:
        db_tweets = db_server[db_tweet_name]
    else:
        db_tweets = db_server.create(db_tweet_name)


    query = "melbourne housing"
    tweet_fields="lang,geo,created_at,public_metrics"
    expansions="author_id,geo.place_id"
    place_fields="country,geo,contained_within,country_code,id,name,place_type,full_name"
    user_fields="id,location,name,public_metrics"

    max_results = 100
    limit = 100
    counter = 0

    resp = client.search_recent_tweets(query,tweet_fields=tweet_fields,expansions=expansions,place_fields=place_fields,user_fields=user_fields, max_results=max_results)
    if resp.errors:
        raise RuntimeError(resp.errors)
    if resp.data:
        for tweet in resp.data:
            
                data_json=tweet.data
                print(tweet.__repr__())
                data_json["author"]={}
                if tweet.author_id!=None:
                    for author in resp.includes['users']:
                        if tweet.author_id==author['id']:
                            data_json['author']['author_id']=author['id']
                            data_json['author']['name']=author['name']
                            data_json['author']['public metrics']=author['public_metrics']
                            data_json['author']['location']=author['location']
                data_json['geo']=tweet.geo
                if tweet.geo != None:
                    for place in resp.includes['places']:
                        if tweet.geo['place_id']==place['id']:
                            data_json['geo']['name']=place['name']
                            data_json['geo']['full_name']=place['full_name']       
                            data_json['geo']['country']=place['country']
                            data_json['geo']['geo']=place['geo']       
                print(data_json)
                ls.append(data_json)
                db_tweets.save(data_json)
                counter += 1
    '''
    while resp.meta["next_token"] and counter < limit:
        resp = client.search_recent_tweets(query, tweet_fields=tweet_fields,expansions=expansions,place_fields=place_fields,user_fields=user_fields,max_results=max_results, next_token=resp.meta["next_token"])
        if resp.errors:
            raise RuntimeError(resp.errors)
        if resp.data:
            for tweet in resp.data:
                    data_json=tweet.data
                    print(tweet.__repr__())
                    data_json["author"]={}
                    if tweet.author_id!=None:
                        for author in resp.includes['users']:
                            if tweet.author_id==author['id']:
                                data_json['author']['author_id']=author['id']
                                data_json['author']['name']=author['name']
                                data_json['author']['public metrics']=author['public_metrics']

                    data_json['geo']=tweet.geo
                    if tweet.geo != None:
                        for place in resp.includes['places']:
                            if tweet.geo['place_id']==place['id']:
                                data_json['geo']['full_name']=place['full_name']       
                                data_json['geo']['country']=place['country']
                                data_json['geo']['geo']=place['geo']       
       
                    print(data_json)
                    ls2.append(data_json)
                    counter += 1
                    '''

    initial=json.dumps(ls)
    file.write(initial)