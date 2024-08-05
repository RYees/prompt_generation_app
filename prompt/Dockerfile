FROM python:3.10.12

WORKDIR /prompt

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY prompt/ .

EXPOSE 5000

CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0" ]