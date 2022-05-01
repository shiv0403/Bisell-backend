import pandas as pd
import requests
import csv
from bs4 import BeautifulSoup
import numpy as np

url = 'https://www.4icu.org/in/town/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

rank = []
university = []
city = []
aboutUniversityLinks = []

university_data = soup.find('table')
university_data = university_data.contents[3].contents

for i in range(0, len(university_data)):
    if university_data[i] != '\n':
        college_data = university_data[i].contents
        for j in range(0, len(college_data)):
            if j & 1:
                data = college_data[j].get_text()
                if j == 1:
                    rank.append(data)
                elif j == 3:
                    link = "4icu.org" + college_data[j].find('a').get('href')
                    aboutUniversityLinks.append(link)
                    university.append(data)
                elif j == 5:
                    city.append(data)

data_len = min(len(rank), len(city), len(
    university), len(aboutUniversityLinks))

data = []

for i in range(0, data_len):
    l = []
    mydata = {"rank": rank[i], "university": university[i],
              "city": city[i], "aboutUniversityLink": aboutUniversityLinks[i]}
    l.append(rank[i])
    l.append(university[i])
    l.append(city[i])

    l.append(aboutUniversityLinks[i])

    # print(mydata)
    # x = requests.post("http://localhost:8080/v1/college", json=mydata)
    # break
    data.append(l)

with open('collegeData.csv', 'w', newline="\n") as f:
    writer = csv.writer(f)
    writer.writerows(data)
