import pandas as pd
import json
df=pd.read_csv("melb-language.csv")
df.set_index(["Sa2code"], inplace=True)
js = df.to_json(orient="index",force_ascii=False)
with open("AURIN_melb_language.json",'w',encoding='utf-8') as file:
    file.write(js)
