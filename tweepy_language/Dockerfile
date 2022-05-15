FROM python:3

WORKDIR /home/ubuntu/COMP90024A2/COMP90024-Assignment2/tweepy_language

COPY . .

# Install dependencies
RUN pip3 install -r requirements.txt

CMD ["language.py"]

ENTRYPOINT ["python3"]