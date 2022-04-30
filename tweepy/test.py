import json
file = open('stream.json', 'r')
file1=json.load(file)
for x in file1:
    print(x)
