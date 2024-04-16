from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
@app.route('/home')
def index():
    return render_template("index.html")


@app.route('/get', methods=['POST'])
def get():
    data = request.json
    # распаковка JSON
    # дальнейшие действия (бекенд)


if __name__ == "__main__":
    app.run(debug=True)
