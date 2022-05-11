FROM python:3

WORKDIR /home/ubuntu/COMP90024/COMP90024-Assignment2/tweepy

COPY . .

# Install dependencies
RUN pip3 install -r requirements.txt

CMD ["tweepy-search-stream-couchdb.py"]

ENTRYPOINT ["python3"]