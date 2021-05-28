import sys
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify


app = Flask(__name__)

df_alexa = pd.read_csv('public/sentiment_analyzer/amazon_alexa.tsv', sep='\t')
df_alexa.head()
vectrorizer = CountVectorizer()
vectrorizer.fit_transform(df_alexa['verified_reviews'])
model = load_model('public/sentiment_analyzer/model.h5')


@app.route('/singleRating', methods=['POST'])
def SingleRating():
    try:
        review = request.get_json()['review']
        if review == None:
            return "Review column in empty", 400
        return {"value": str(model.predict(vectrorizer.transform([review]).toarray())[0][0])}
    except Exception as e:
        return 'Error occured in the server'


@app.route('/multipleRating', methods=['POST'])
def getMultipleRating():
    try:
        filePath = request.get_json()['filePath']
        if filePath == None:
            return "File path is empty", 400

        df_alexa = []
        if filePath.endswith('csv'):
            df_alexa = pd.read_csv(filePath)
        elif filePath.endswith('tsv'):
            df_alexa = pd.read_csv(filePath, sep='\t')
        else:
            return "File not found", 400
        try:
            review = df_alexa['review']
            values = model.predict(vectrorizer.transform(review).toarray())
            return jsonify(data=[{"review": val[0], "value": str(val[1])} for val in np.column_stack((review, values))])
        except Exception as e:
            return "Column named review not found", 400
    except Exception as e:
        return 'Error occured in the server'


def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()


@app.route('/close', methods=['GET'])
def close():
    shutdown_server()
    return 'Stopping the server'


if __name__ == '__main__':
    app.run(host="localhost", port=sys.argv[1], debug=True)
