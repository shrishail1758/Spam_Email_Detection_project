from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

# Load the trained model and vectorizer
model = pickle.load(open('best_model.pkl', 'rb'))
tfidf = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_text = data.get('emailText', '')

    if email_text:
        # Transform the email text with TF-IDF and convert to dense
        vector_input = tfidf.transform([email_text]).toarray()  # Convert to dense array
        result = model.predict(vector_input)[0]
        result_text = "Spam" if result == 1 else "Not Spam"
        return jsonify(prediction=result_text)
    return jsonify(prediction="No input provided")


if __name__ == '__main__':
    app.run(debug=True, port=8000)
