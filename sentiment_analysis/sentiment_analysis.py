import seaborn as sns
import matplotlib.pyplot as plt
import re
from textblob import TextBlob
sns.set(font_scale=1.5,style="white")

fp = open('search_housing.json', 'r')

for line in fp:
        dataset = line
dataset = json.loads(dataset)

polarity_value=[]
subjectivity_value=[]

for text in dataset:
    testimonial=TextBlob(text)
    polarity_value.append(testimonial.sentiment.polarity)
    subjectivity_value.append(testimonial.sentiment.subjectivity)
print(polarity_value)
plt.figure(figsize=(10,6))
sns.distplot(polarity_value,hist=False)
plt.title("Polarization for Melbourne housing")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.savefig("Polarity_housing.png")


fp = open('search_opportunity.json.json','r')

for line in fp:
        dataset2 = line
dataset2 = json.loads(dataset2)

polarity_value=[]
subjectivity_value=[]

for text in dataset2:
    testimonial2=TextBlob(text)
    polarity_value.append(testimonial2.sentiment.polarity)
    subjectivity_value.append(testimonial2.sentiment.subjectivity)
print(polarity_value)
plt.figure(figsize=(10,6))
sns.distplot(polarity_value,hist=False)
plt.title("Polarization for Melbourne opportunity")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.savefig("Polarity_opportunity.png")