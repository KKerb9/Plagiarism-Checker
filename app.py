from flask import Flask, render_template, url_for, request, jsonify
from flask import session
import os
import sqlite3
from datetime import timedelta
from checker.check import calculate_levenshtein_distance

app = Flask(__name__)


@app.route('/')
@app.route('/home/')
def index():
    session_auth()
    return render_template("index.html")

 
@app.route('/results/')
def results():
    session_auth()
    return render_template("results.html")


@app.route('/upload', methods=['POST'])
def upload():
    session_auth()
    app.CURR_QUERIES_CNT += 1
    get_data = request.json
    # print(get_data['textarea-1'], get_data['textarea-2'], get_data['file-input-1'], get_data['file-input-2'], end='\n')
    # распаковка JSON
    # дальнейшие действия (бекенд)
#     input_file = ''
#     output_file = ''
#     os.system(f'checker/checker_executable.o < {input_file} > {output_file}')

    calculate_levenshtein_distance(request.get_json())
    return jsonify({'result': 'aboba', 'text1': get_data['text1'], 'text2': get_data['text2']})


@app.route('/results', methods=['GET'])
def get_res():
    session_auth()
    # резы обработки
    # делаем json
    data = jsonify({'results': ['result1', 'result2', 'result3']})
    return data


def session_auth():
    if ('current_session_id' not in session):
        session.permanent = True
        app.CURR_SESSION_CNT += 1
        session['current_session_id'] = app.CURR_SESSION_CNT
        return True
    return False


@app.route('/auth_test')
def auth_test():
    if (session_auth()):
        return "Welcome!"
    else:
        return f"Welcome, {session['current_session_id']}!"


if __name__ == "__main__":
#     os.system('g++ -std=c++23 -O2 checker/main.cpp -o checker/checker_executable.o')
    app.secret_key = os.urandom(24)
    app.CURR_SESSION_CNT = 0
    app.CURR_QUERIES_CNT = 0
    app.permanent_session_lifetime = timedelta(days=1)
    os.system('g++ -std=c++17 -O2 checker/levenshtein_distance.cpp -o checker/levenshtein_distance')
    app.run(debug=True)
