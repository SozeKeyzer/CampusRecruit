import spacy
import pickle
import sys, fitz

# train_data = pickle.load(open('C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/train_data.pkl', 'rb'))
nlp_model = spacy.load('C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/nlp_model')
fname = 'C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/My Resume.pdf'

doc = fitz.open(fname)
text = ""
for page in doc:
    text += page.get_text()

tx = " ".join(text.split('\n'))
# print(tx)

doc = nlp_model(tx)
for ent in doc.ents:
    print(f'{ent.label_.upper():{30}}- {ent.text}')
