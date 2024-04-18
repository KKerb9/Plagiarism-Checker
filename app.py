from flask import Flask, render_template, url_for, request, jsonify


app = Flask(__name__)


@app.route('/')
@app.route('/home/')
def index():
    return render_template("index.html")

@app.route('/results/')
def results():
    return render_template("results.html")


@app.route('/upload', methods=['POST'])
def upload():
    get_data = request.json
    # print(get_data['textarea-1'], get_data['textarea-2'], get_data['file-input-1'], get_data['file-input-2'], end='\n')
    # распаковка JSON
    # дальнейшие действия (бекенд)
    return jsonify({'result': 'aboba'})


@app.route('/results', methods=['GET'])
def get_res():
    # резы обработки
    # делаем json
    data = jsonify({'results': ['result1', 'result2', 'result3']})
    return data


if __name__ == "__main__":
    app.run(debug=True)
