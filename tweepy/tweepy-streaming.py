import os
import logging
import json
from tweepy import StreamingClient, StreamRule, Tweet


file = open('stream.json', 'w')
ls=[]


class TweetListener(StreamingClient):
    """
    StreamingClient allows filtering and sampling of realtime Tweets using Twitter API v2.
    https://docs.tweepy.org/en/latest/streamingclient.html#tweepy.StreamingClient
    """

    def on_tweet(self, tweet: Tweet):
        print(tweet.__repr__())
        data_json=tweet.data
        data_json['geo']=tweet.geo
        data_json['author']={}
        data_json.pop('author_id',None)
        ls.append(data_json)
    
    def on_includes(self, includes: dict):
        author=includes['users'][0]
        a={}
        a['author_id']=author['id']
        a['name']=author['name']
        a['public metrics']=author['public_metrics']
        a['location']=author['location']
        ls[-1]['author']=a
        if 'places' in includes:
            place=includes['places'][0]
            ls[-1]['geo']['name']=place['name']
            ls[-1]['geo']['full_name']=place['full_name']
            ls[-1]['geo']['country']=place['country']
            ls[-1]['geo']['geo']=place['geo']       
        print(ls[-1])

    def on_request_error(self, status_code):
        print(status_code)

    def on_connection_error(self):
        self.disconnect()


if __name__ == "__main__":

    """
     - Save it in a secure location
     - Treat it like a password or a set of keys
     - If security has been compromised, regenerate it
     - DO NOT store it in public places or shared docs
    """
    bearer_token = os.getenv("TWITTER_BEARER_TOKEN")

    if not bearer_token:
        raise RuntimeError("Not found bearer token")

    client = TweetListener(bearer_token)


    rules = [
        StreamRule(value="melbourne housing")
    ]

    resp = client.get_rules()
    if resp and resp.data:
        rule_ids = []
        for rule in resp.data:
            rule_ids.append(rule.id)

        client.delete_rules(rule_ids)   

    resp = client.add_rules(rules, dry_run=True)
    if resp.errors:
        raise RuntimeError(resp.errors)

    resp = client.add_rules(rules)
    if resp.errors:
        raise RuntimeError(resp.errors)

    print(client.get_rules())
    
    tweet_fields="lang,geo,created_at,public_metrics"
    expansions="author_id,geo.place_id"
    place_fields="country,geo,contained_within,country_code,id,name,place_type,full_name"
    user_fields="id,location,name,public_metrics"
    
    
    
    try:
        client.filter(tweet_fields=tweet_fields,expansions=expansions,place_fields=place_fields,user_fields=user_fields)
    except KeyboardInterrupt:
        initial=json.dumps(ls)
        file.write(initial)
        client.disconnect()
