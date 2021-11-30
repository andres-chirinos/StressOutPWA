from flask import Flask, render_template

app = Flask(__name__)


@app.route('/main', strict_slashes=False, subdomain = 'app')
def main():
    return render_template("main.html")

@app.route('/', strict_slashes=False)#, subdomain = 'app'
def apps():
    return render_template("app.html")

@app.route('/terms', strict_slashes=False)
def terms():
    return 'conditions and terms' #render_template("about.html")

# Make sure this we are executing this file
if __name__ == '__main__':
    #app.config['SERVER_NAME'] = 'localhost:5000' #Main URl
    app.run()#debug=True)