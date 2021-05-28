import React from 'react';
import Button from './../Button/Button';
import './Info.scss';
import video from './../../images/video.mp4';
import countPlotFeedback from './plots/countPlot_feedback.png';
import countPlotRating from './plots/countPlot_rating.png';
import barPlot from './plots/barPlot.png';
import wordCloud from './plots/wordCloud.png';
import histogramLength from './plots/histogramLength.png';
const { dialog } = window.require('electron').remote;
const { ipcRenderer } = window.require('electron');

export default function Info() {
    return (
        <div className="info">
            <div className="heading">Building ANN walk through</div>
            <div style={{ padding: "10px" }}>In this project we are trying to build the ANN model for the
                <p style={{ display: "inline", color: "blue", cursor: "pointer" }} onClick={(e) => {
                    e.preventDefault();
                    window.require("electron").shell.openExternal("https://www.kaggle.com/sid321axn/amazon-alexa-reviews");
                }}> amazon alexa dataset </p>.
                The
                <p style={{ display: "inline", color: "blue", cursor: "pointer" }} onClick={(e) => {
                    e.preventDefault();
                    window.require("electron").shell.openExternal("https://github.com/subramanya9112/sentiment_analyzer");
                }}> git </p> to this project
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <video className="video" autoPlay muted loop >
                    <source src={video} type="video/mp4"></source>
                </video>
            </div>
            <div style={{ fontSize: "24px" }}>Let's follow the general machine learning workflow step-by-step:</div>
            <ol className="workflow" start="0">
                <li>Intution</li>
                <li>Data Importing</li>
                <li>Exploratory data analysis</li>
                <li>Data Visualization</li>
                <li>Select and build a model</li>
                <li>Evaluate the model on both training testing set and save model</li>
            </ol>

            <div className="subHeading">0. Intution</div>
            <div className="subSection">
                NLP:
            </div>
            <div className="subSection">
                &nbsp;&nbsp;&nbsp;&nbsp;NLP is the branch of AI that gives the machines, the ability to read understand and drive meaning from human language. It combines the field of linguistics and computer science to decipher language structure and guidelines, to make models which can comprehend break down and separate significant details from text and speech. It helps computers communicate with humans in their own language and scales other language-related tasks. For example, NLP makes it possible for computers to read text, hear speech, interpret it, measure sentiment and determine which parts are important.
            </div>
            <div className="subSection">
                &nbsp;&nbsp;&nbsp;&nbsp;Human language is astoundingly complex and diverse. We express ourselves in infinite ways, both verbally and in writing. Everyday humans interact with each other through social media transferring vast quantities of freely available data to each other. This data is useful in understanding human behaviour and their habits. Data Analysts and Machine Learning experts utilize this data to give machines, the ability to mimic human behaviour.
            </div>
            <div className="subSection">
                Some techniques used in NLP are:
                <ol>
                    <li>Segmentation</li>
                    <li>Tokenizing</li>
                    <li>Stop Words</li>
                    <li>Stemming</li>
                    <li>Lemmatization</li>
                    <li>Speech Tagging</li>
                    <li>Named entity tag</li>
                </ol>
            </div>

            <div className="subSection">
                ANN:
            </div>
            <div className="subSection">
                &nbsp;&nbsp;&nbsp;&nbsp;An artificial neural network (ANN) is the piece of a computing system designed to simulate the way the human brain analyses and processes information. It is the foundation of artificial intelligence (AI) and solves problems that would prove impossible or difficult by human or statistical standards. ANNs have self-learning capabilities that enable them to produce better results as more data becomes available.
            </div>
            <div className="subSection">
                &nbsp;&nbsp;&nbsp;&nbsp;Artificial neural networks are composed of an input layer, which receives data from outside sources (data files, images, hardware sensors, microphone…), one or more hidden layers that process the data, and an output layer that provides one or more data points based on the function of the network. For instance, a neural network that detects persons, cars and animals will have an output layer with three nodes.
            </div>
            <div className="subSection">
                &nbsp;&nbsp;&nbsp;&nbsp;Artificial neural networks start by assigning random values to the weights of the connections between neurons. The key for the ANN to perform its task correctly and accurately is to adjust these weights to the right numbers. But finding the right weights is not very easy, especially when we’re dealing with multiple layers and thousands of neurons.
            </div>

            <div className="subHeading">1. Data importing</div>
            <div className="subSection">In this step we will import the data from the file using pandas.</div>
            <div className="codeSection">
                <span className="purple">import</span>&nbsp;<span className="white">pandas</span>&nbsp;<span className="purple">as</span>&nbsp;<span className="white">pd</span><br />
                <span className="white">df_alexa</span>&nbsp;<span className="blue">=</span>&nbsp;<span className="white">pd.</span><span className="blue">read_csv</span><span className="white">(</span><span className="green">'amazon_alexa.tsv'</span><span className="white">,</span>&nbsp;<span className="red">sep</span><span className="blue"> = </span><span className="green">'</span><span className="blue">\t</span><span className="green">'</span><span className="white">)</span><br />
                <span className="white">df_alexa</span><br />
            </div>

            <div className="subHeading">2. Exploratory data analysis</div>
            <div className="subSection">In this step, let's explore the data and draw some insights.</div>
            <div className="subSection">Let's check the columns</div>
            <div className="codeSection">
                <span className="white">df_alexa.</span><span className="blue">columns</span><br />
            </div>

            <div className="subSection">Let's check the top and last rows</div>
            <div className="codeSection">
                <span className="white">df_alexa.</span><span className="blue">head</span><span className="white">()</span><br />
                <span className="white">df_alexa.</span><span className="blue">tail</span><span className="white">()</span><br />
            </div>

            <div className="subSection">Let's check the integer columns</div>
            <div className="codeSection">
                <span className="white">df_alexa.</span><span className="blue">describe</span><span className="white">()</span><br />
            </div>

            <div className="subSection">Let's check how much null values are there in each column. There is one null value in the column review</div>
            <div className="codeSection">
                <span className="white">df_alexa.</span><span className="blue">isnull</span><span className="white">().<span className="blue">sum</span>()</span><br />
            </div>

            <div className="subHeading">3. Data Visualization</div>
            <div className="subSection">This is the most important step. In this step we will visulaize the data and draw insights</div>

            <div className="subSection">First let's import the module needed, matplotlib and seaborn</div>
            <div className="codeSection">
                <span className="purple">import </span><span className="white">matplotlib.pyplot </span><span className="purple">as </span><span className="white">plt </span><br />
                <span className="purple">import </span><span className="white">seaborn </span><span className="purple">as </span><span className="white">sns </span><br />
                <span className="blue">%</span><span className="white">matplotlib inline</span><br />
            </div>

            <div className="subSection">Let's visulaize the count of feedback via countplot</div>
            <div className="codeSection">
                <span className="white">sns.<span className="blue">countplot</span>(df_alexa[<span className="green">'feedback'</span>], <span className="red">label </span><span className="blue">= </span><span className="green">'Count'</span>)</span><br />
            </div>
            <div className="plot">
                <img src={countPlotFeedback} alt="countPlotFeedback" />
            </div>

            <div className="subSection">Let's visulaize the count of rating via countplot</div>
            <div className="codeSection">
                <span className="white">sns.<span className="blue">countplot</span>(<span className="red">x </span><span className="blue">= </span><span className="green">'rating'</span>, <span className="red">data </span><span className="blue">= </span>df_alexa, <span className="red">label </span><span className="blue">= </span><span className="green">'Count'</span>)</span><br />
            </div>
            <div className="plot">
                <img src={countPlotRating} alt="countPlotRating" />
            </div>

            <div className="subSection">Let's visulaize the variation and rating using the barplot</div>
            <div className="codeSection">
                <span className="white">plt.<span className="blue">figure</span>(<span className="red">figsize</span><span className="blue"> = </span>(<span className="orange">40</span>,<span className="orange">15</span>))</span><br />
                <span className="white">sns.<span className="blue">barplot</span>(<span className="red">x </span><span className="blue">= </span><span className="green">'variation'</span>, <span className="red">y </span><span className="blue">= </span><span className="green">'rating'</span>, <span className="red">data </span><span className="blue">= </span>df_alexa, <span className="red">palette </span><span className="blue">= </span><span className="green">'deep'</span>)</span><br />
            </div>
            <div className="plot">
                <img src={barPlot} alt="barPlot" />
            </div>

            <div className="subSection">Let's visulaize the word's from feedback via wordcloud</div>
            <div className="codeSection">
                <span className="white"><span className="purple">from </span>wordcloud <span className="purple">import </span>WordCloud</span><br />
                <span className="white">plt.<span className="blue">figure</span>(<span className="red">figsize</span><span className="blue"> = </span>(<span className="orange">20</span>,<span className="orange">20</span>))</span><br />
                <span className="white">plt.<span className="blue">imshow</span>(<span className="blue">WordCloud</span>().<span className="blue">generate</span>(<span className="green">" "</span>.<span className="blue">join</span><span>(df_alexa[<span className="green">'verified_reviews'</span>].<span className="blue">tolist</span>())</span>))</span><br />
            </div>
            <div className="plot">
                <img src={wordCloud} alt="wordCloud" />
            </div>

            <div className="subSection">Let's visulaize the length of review's by histogram</div>
            <div className="codeSection">
                <span className="purple">from</span>&nbsp;<span className="white">sklearn.feature_extraction.text</span>&nbsp;<span className="purple">import</span>&nbsp;<span className="white">CountVectorizer</span><br />
                <span className="white">vectorizer<span className="blue"> = CountVectorizer</span>()</span><br />
                <span className="white">countVectorizer <span className="blue">=</span> vectorizer.<span className="blue">fit_transform</span>(df_alexa[<span className="green">'verified_reviews'</span>])</span><br />
                <br />
                <span className="white">vectorizer.<span className="blue">get_feature_names</span>()</span><br />
                <br />
                <span className="white">countVectorizer.<span className="blue">toarray</span>()</span><br />
                <br />
                <span className="white">df_alexa[<span className="green">'length'</span>] <span className="blue">=</span> df_alexa[<span className="green">'verified_reviews'</span>].<span className="blue">apply</span>(len)</span><br />
                <span className="white">df_alexa[<span className="green">'length'</span>].<span className="blue">hist</span>(<span className="red">bins </span><span className="blue">=</span> <span className="green">100</span>)</span> <br />
            </div>
            <div className="plot">
                <img src={histogramLength} alt="histogramLength" />
            </div>

            <div className="subHeading">4. Select and build a model</div>
            <div className="subSection">Let's import the required libraries</div>
            <div className="codeSection">
                <span className="purple">import </span><span className="white">numpy </span><span className="purple">as </span><span className="white">np </span><br />
                <span className="purple">import </span><span className="white">tensorflow </span><span className="purple">as </span><span className="white">tf </span><br />
                <span className="purple">from </span><span className="white">sklearn.model_selection </span><span className="purple">as </span><span className="white">train_test_split </span><br />
            </div>

            <div className="subSection">Let's build the X and y</div>
            <div className="codeSection">
                <span className="white">X<span className="blue"> = </span>pd.<span className="blue">DataFrame</span>(vectorizer.<span className="blue">fit_transform</span>(df_alexa[<span className="green">'verified_reviews'</span>]).<span className="blue">toarray</span>())</span><br />
                <span className="white">y<span className="blue"> = </span>df_alexa[<span className="green">'feedback'</span>]</span><br />
            </div>

            <div className="subSection">Let's divide the data to training and testing data</div>
            <div className="codeSection">
                <span className="white">X_train, X_test, y_train, y_test <span className="blue">= train_test_split</span>(X, y, <span className="red">test_size</span> <span className="blue">=</span> <span className="green">0.2</span>)</span><br />
            </div>

            <div className="subSection">Check the shape of the returned values</div>
            <div className="codeSection">
                <span className="white">X_train.<span className="blue">shape</span></span><br />
                <span className="white">X_test.<span className="blue">shape</span></span><br />
                <span className="white">y_train.<span className="blue">shape</span></span><br />
                <span className="white">y_test.<span className="blue">shape</span></span><br />
            </div>

            <div className="subSection">Let's build the ANN model</div>
            <div className="codeSection">
                <span>model <span className="blue">=</span> tf.keras.<span className="blue">Sequential</span>()</span><br />
                <span>model.<span className="blue">add</span>(tf.keras.layers.<span className="blue">Dense</span>(<span className="red">units</span> <span>=</span> <span className="green">400</span>, <span className="red">input_shape</span> <span>=</span> [X.<span className="blue">shape</span>[1], ], <span className="red">activation</span> <span>=</span> <span className="green">'relu'</span>))</span><br />
                <span>model.<span className="blue">add</span>(tf.keras.layers.<span className="blue">Dense</span>(<span className="red">units</span> <span>=</span> <span className="green">400</span>, <span className="red">activation</span> <span>=</span> <span className="green">'relu'</span>))</span><br />
                <span>model.<span className="blue">add</span>(tf.keras.layers.<span className="blue">Dense</span>(<span className="red">units</span> <span>=</span> <span className="green">1</span>, <span className="red">activation</span> <span>=</span> <span className="green">'sigmoid'</span>))</span><br />
                <br />
                <span className="white">model.<span className="blue">compile</span>(<span className="red">optimizer</span><span className="blue"> = </span><span className="green">'Adam'</span>, <span className="red">loss</span><span className="blue"> = </span><span className="green">'binary_crossentropy'</span>, <span className="red">metrics</span><span className="blue"> = </span>[<span className="green">'accuracy'</span>])</span><br />
                <span className="white">model.<span className="blue">fit</span>(x, y, <span className="red">epochs</span><span className="blue"> = </span><span className="green">10</span>)</span><br />
            </div>

            <div className="subSection">Let's predict the value for the test dataset</div>
            <div className="codeSection">
                <span className="white">y_pred <span className="blue">=</span> model.<span className="blue">predict</span>(X_test)</span><br />
                <span className="white">y_pred</span><br />
            </div>

            <div className="subHeading">5. Evaluate the model on both training testing set and save model</div>
            <div className="subSection">Let's import the required libraries</div>
            <div className="codeSection">
                <span className="purple">from </span><span className="white">sklearn.metrics </span><span className="purple">as </span><span className="white">confusion_matrix </span><br />
            </div>

            <div className="subSection">Confusion matrix for training dataset</div>
            <div className="codeSection">
                <span className="white">cm<span className="blue"> = confusion_matrix</span>(y_train, (model.<span className="blue">predict</span>(X_train)<span className="blue"> &gt; </span><span className="green">0.5</span>))</span><br />
                <span className="white">sns.<span className="blue">heatmap</span>(cm, <span className="red">annot</span><span className="blue"> = </span><span className="orange">True</span>)</span><br />
            </div>

            <div className="subSection">Confusion matrix for testing dataset</div>
            <div className="codeSection">
                <span className="white">cm<span className="blue"> = confusion_matrix</span>(y_test, (model.<span className="blue">predict</span>(X_test)<span className="blue"> &gt; </span><span className="green">0.5</span>))</span><br />
                <span className="white">sns.<span className="blue">heatmap</span>(cm, <span className="red">annot</span><span className="blue"> = </span><span className="orange">True</span>)</span><br />
            </div>

            <div className="subSection">Predict the values for 2 review</div>
            <div className="codeSection">
                <span>y_pred <span className="blue">=</span> model.<span className="blue">predict</span>(vectorizer.<span className="blue">transform</span>([<span className="green">"Love my Echo!"</span>, <span className="green">"It's like Siri"]</span>]).<span className="blue">toarray</span>())</span><br />
                <span className="white"><span className="blue">print</span>(y_pred)</span>
            </div>

            <div className="subSection">Let's save the model</div>
            <div className="codeSection">
                <span>model.<span className="blue">save(</span><span className="green">'model.h5'</span>)</span><br />
            </div>

            <div className="subHeading">6. Download Section</div>
            <p className="subSection">You can download the file here</p>
            <div className="downloading">
                <Button name="Dataset" onClick={() => {
                    dialog.showSaveDialog({
                        title: "Save dataset",
                        properties: ['showHiddenFiles'],
                        filters: [
                            { name: 'Tab Seperated files', extensions: ['tsv'] },
                        ]
                    }).then(result => {
                        if (result.canceled === false) {
                            ipcRenderer.send('saveFile', "dataset", result.filePath)
                        }
                    }).catch(() => { })
                }}></Button>
                <Button name=".py file" onClick={() => {
                    dialog.showSaveDialog({
                        title: "Save py file",
                        properties: ['showHiddenFiles'],
                        filters: [
                            { name: 'python file', extensions: ['py'] },
                        ]
                    }).then(result => {
                        if (result.canceled === false) {
                            ipcRenderer.send('saveFile', "py", result.filePath)
                        }
                    }).catch(() => { })
                }}></Button>
                <Button name=".ipynb file" onClick={() => {
                    dialog.showSaveDialog({
                        title: "Save ipynb file",
                        properties: ['showHiddenFiles'],
                        filters: [
                            { name: 'jupyter file', extensions: ['ipynb'] },
                        ]
                    }).then(result => {
                        if (result.canceled === false) {
                            ipcRenderer.send('saveFile', "ipynb", result.filePath)
                        }
                    }).catch(() => { })
                }}></Button>
                <Button name=".h5 file" onClick={() => {
                    dialog.showSaveDialog({
                        title: "Save h5 file",
                        properties: ['showHiddenFiles'],
                        filters: [
                            { name: 'hierarchical data format', extensions: ['h5'] },
                        ]
                    }).then(result => {
                        if (result.canceled === false) {
                            ipcRenderer.send('saveFile', "h5", result.filePath)
                        }
                    }).catch(() => { })
                }}></Button>
            </div>
        </div >
    )
}
