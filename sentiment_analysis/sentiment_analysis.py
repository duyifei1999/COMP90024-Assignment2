import seaborn as sns
import matplotlib.pyplot as plt
import re
from textblob import TextBlob
import json
import pandas as pd

sns.set(font_scale=1.5, style="white")

# display all columns
pd.set_option('display.max_columns', None)
# display all rows
pd.set_option('display.max_rows', None)

# read json file
d = json.load(open("search_housing.json"))
sentiment = []
texts = []
for i in d:
    text = i['text']
    texts.append(text)
    blob = TextBlob(text)
    value = blob.sentiment.polarity
    sentiment.append(value)

df = pd.DataFrame(texts, index=range(len(texts)), columns=['text'])
df['sentiment'] = sentiment
print(df)
plt.figure(figsize=(10, 6))
sns.distplot(sentiment, hist=False)
plt.title("Polarization for Melbourne housing")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.show()
# plt.savefig("sentiment_housing.png")

d = json.load(open("search_opportunity.json"))
sentiment = []
texts = []
for i in d:
    text = i['text']
    texts.append(text)
    blob = TextBlob(text)
    value = blob.sentiment.polarity
    sentiment.append(value)

df = pd.DataFrame(texts, index=range(len(texts)), columns=['text'])
df['sentiment'] = sentiment
print(df)
plt.figure(figsize=(10, 6))
sns.distplot(sentiment, hist=False)
plt.title("Polarization for Melbourne opportunity")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.show()
# plt.savefig("sentiment_housing.png")

