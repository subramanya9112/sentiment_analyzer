# -*- coding: utf-8 -*-
"""
Created on Fri May 28 11:42:09 2021

@author: subramanyag
"""

import pandas as pd
df_alexa = pd.read_csv('amazon_alexa.tsv', sep = '\t')
df_alexa

df_alexa.columns

df_alexa.head()
df_alexa.tail()

df_alexa.describe()

df_alexa.isnull().sum()

import matplotlib.pyplot as plt
import seaborn as sns

sns.countplot(df_alexa['feedback'], label = 'Count')

sns.countplot(x = 'rating', data = df_alexa, label = 'Count')

plt.figure(figsize = (40,15))
sns.barplot(x = 'variation', y = 'rating', data = df_alexa, palette = 'deep')

from wordcloud import WordCloud
plt.figure(figsize = (20,20))
plt.imshow(WordCloud().generate(" ".join(df_alexa['verified_reviews'].tolist())))

from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer()
countVectorizer = vectorizer.fit_transform(df_alexa['verified_reviews'])

vectorizer.get_feature_names()

countVectorizer.toarray()

df_alexa['length'] = df_alexa['verified_reviews'].apply(len)
df_alexa['length'].hist(bins=100)

import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split

X = pd.DataFrame(vectorizer.fit_transform(df_alexa['verified_reviews']).toarray())
y = df_alexa['feedback']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 28052021)

X_train.shape
X_test.shape
y_train.shape
y_test.shape

model = tf.keras.Sequential()
model.add(tf.keras.layers.Dense(units=400, input_shape=[X.shape[1], ], activation='relu'))
model.add(tf.keras.layers.Dense(units=400, activation='relu'))
model.add(tf.keras.layers.Dense(units=1, activation='sigmoid'))

model.compile(optimizer='Adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X, y, epochs=10)

y_pred = model.predict(X_test)
y_pred

from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_train, (model.predict(X_train) > 0.5))
sns.heatmap(cm, annot = True)

cm = confusion_matrix(y_test, (model.predict(X_test) > 0.5))
sns.heatmap(cm, annot = True)

y_pred = model.predict(vectorizer.transform(["Love my Echo!", "It's like Siri, in fact, Siri answers more accurately then Alexa. I don't see a real need for it in..."]).toarray())
print(y_pred)

model.save('model.h5')
