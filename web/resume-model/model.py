import spacy
import pickle
import random
import os

train_data = pickle.load(open('C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/train_data.pkl', 'rb'))


nlp = spacy.blank('en')

def train_model(train_data):
    if 'ner' not in nlp.pipe_names:
        nlp.add_pipe('ner')
    
    ner = nlp.get_pipe('ner')  # Get the NER component after adding it
    
    for _, annotation in train_data:
        for ent in annotation['entities']:
            ner.add_label(ent[2])
            
    
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'ner']
    with nlp.disable_pipes(*other_pipes):  # only train NER
        optimizer = nlp.begin_training()
        for itn in range(10):
            print("Starting iteration " + str(itn))
            random.shuffle(train_data)
            losses = {}
            index = 0
            for text, annotations in train_data:
                try:
                    nlp.update(
                        [text],  # batch of texts
                        [annotations],  # batch of annotations
                        drop=0.2,  # dropout - make it harder to memorize data
                        sgd=optimizer,  # callable to update weights
                        losses=losses)
                except Exception as e:
                    pass
                
            print(losses)

    

train_model(train_data)
nlp.to_disk('C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/nlp_model')

