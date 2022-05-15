FROM python:3

ENV HTTP_PROXY: http://wwwproxy.unimelb.edu.au:8000/
ENV HTTPS_PROXY: http://wwwproxy.unimelb.edu.au:8000/
ENV http_proxy: http://wwwproxy.unimelb.edu.au:8000/
ENV https_proxy: http://wwwproxy.unimelb.edu.au:8000/
ENV no_proxy: localhost, 127.0.0.1, localaddress, 172.16.0.0/12, .melbourne.rc.nectar.org.au, .storage.unimelb.edu.au, .cloud.unimelb.edu.au

WORKDIR /home/ubuntu/COMP90024A2/COMP90024-Assignment2/tweepy_language

COPY . .

# Install dependencies
RUN pip3 install -r requirements.txt

CMD ["language.py"]

ENTRYPOINT ["python3"]