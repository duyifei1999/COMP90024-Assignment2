#split the raw file
raw_file = "twitter-melb.json"
#change to the real situation
new_doc = "D:\\Jupyter\\COMP90024-Assignment2\\target\\"
file_num = 0
temp = []
int cont = True
with open(raw_file, encoding="UTF-8") as file:
    while cont:
        for i in range(200000):
            new_line = file.readline()
            if not new_line:
                cont = False;
                break;
            temp.append(new_line)
        with open(new_doc+"small_json_file_"+str(file_num)+".json",encoding="UTF-8") as newfile:
            for line in range(i):
                newfile.write(temp[line])
        file_num = file_num + 1
        temp = []