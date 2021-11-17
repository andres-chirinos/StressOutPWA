from flask import Flask, render_template
  
app = Flask(__name__) 
  
### Domain ###
#@app.route('/') 
#def main(): 
#    return "Main page"

@app.route('/terms') 
def terms(): 
    return "Terms and Conditions page"

### App subdomain ###
@app.route('/') #, subdomain ='app'
def mainapp(): 
    return render_template('app.html')
  
if __name__ == "__main__": 
    app.config['SERVER_NAME'] = 'localhost:5000' #Main URl
    app.run(debug=True) #