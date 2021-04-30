from flask import Flask, jsonify, render_template
import pymongo
from dotenv import load_dotenv
import os

load_dotenv() # use dotenv to hide sensitive credential as environment variables
DATABASE_URL=f'mongodb+srv://user:{os.environ.get("password")}'\
			  '@mongo-heroku-cluster-we.kyrhz.mongodb.net/myFirstDatabase?'\
			  'retryWrites=true&w=majority' # get connection url from environment

client=pymongo.MongoClient(DATABASE_URL) # establish connection with database
mongo_db=client.db # assign database to mongo_db

app=Flask(__name__)

# @app.route('/')
# def index(): 
# 	return 'Use /all_launches_timeline'

@app.route('/')
def dashboard(): 
	return render_template('index.html')

@app.route('/sample_launch/')
def sample():
	results=mongo_db.launches.find_one({}, {'_id': 0})
	return jsonify(results)

@app.route('/all_launches_timeline/')
def all_launches_timeline(): 
	results=mongo_db.launches.aggregate([
		{'$group': {'_id': {'year': {'$substr': ['$date_utc', 0, 4]},
							'quarter': {'$ceil': {'$divide': [{'$toInt': {'$substr': ['$date_utc', 5, 2]}}, 3]}}},
					'launches': {'$push': {'mission_patch_small': '$links.patch.small', 
										   'mission_name': '$name', 
										   'video_link': '$links.webcast', 
										   'wikipedia': '$links.wikipedia', 
										   'mission_patch': '$links.patch.large'}}}}])
	return jsonify(list(results))

if __name__=='__main__': 
	app.run()