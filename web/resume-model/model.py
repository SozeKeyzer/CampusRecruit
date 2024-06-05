from tika import parser
import unicodedata
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file = r'C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/resume/resume.pdf'
file_data = parser.from_file(file)
text = file_data['content']
print(text)

# Remove tabs and newlines from the text
text = re.sub(r'\s+', ' ', text)

# Normalize unicode characters and remove escape sequences
text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')

parsed_content = {}

#E-MAIL

def get_email_addresses(string):
    r = re.compile(r'[\w\.-]+@[\w\.-]+')
    return r.findall(string)

email = get_email_addresses(text)
print(email)
parsed_content['email'] = email

#PHONE NUMBER
import re
def get_phone_numbers(string):
    r = re.compile(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
    phone_numbers = r.findall(string)
    return [re.sub(r'\D', '', num) for num in phone_numbers]

phone_number= get_phone_numbers(text)
if len(phone_number) <= 10:
    print(phone_number)
    parsed_content['phone'] = phone_number

# import spacy
# nlp = spacy.load('en_core_web_sm')
# from spacy.matcher import Matcher
# matcher = Matcher(nlp.vocab)

# def extract_name(text):
#    nlp_text = nlp(text)
  
#    # First name and Last name are always Proper Nouns
#    pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]
  
#    matcher.add('NAME', [pattern], on_match = None)
  
#    matches = matcher(nlp_text)
  
#    for match_id, start, end in matches:
#        span = nlp_text[start:end]
#        return span.text

# name = extract_name(text)
# print(name)
# parsed_content['Name'] =  name

Keywords = ["education",
            "summary",
            "accomplishments",
            "executive profile",
            "professional profile",
            "personal profile",
            "work background",
            "academic profile",
            "other activities",
            "qualifications",
            "experience",
            "interests",
            "skills",
            "achievements",
            "publications",
            "publication",
            "certifications",
            "workshops",
            "projects",
            "internships",
            "trainings",
            "hobbies",
            "overview",
            "objective",
            "position of responsibility",
            "jobs"
           ]

text = text.replace("\n"," ")
text = text.replace("[^a-zA-Z0-9]", " ");  
re.sub('\W+','', text)
text = text.lower()
# print(text)

content = {}
indices = []
keys = []
for key in Keywords:
    try:
        content[key] = text[text.index(key) + len(key):]
        indices.append(text.index(key))
        keys.append(key)
    except:
        pass

#Sorting the indices
zipped_lists = zip(indices, keys)
sorted_pairs = sorted(zipped_lists)
sorted_pairs

tuples = zip(*sorted_pairs)
indices, keys = [ list(tuple) for tuple in  tuples]
keys

#Keeping the required content and removing the redundant part
content = []
for idx in range(len(indices)):
    if idx != len(indices)-1:
        content.append(text[indices[idx]: indices[idx+1]])
    else:
        content.append(text[indices[idx]: ])

for i in range(len(indices)):
    parsed_content[keys[i]] = content[i]   

print(parsed_content)

import json
with open("Parsed_Resume.json", "w") as outfile:
    json.dump(parsed_content, outfile)

