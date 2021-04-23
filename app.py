from flask import Flask, jsonify
import os
from dotenv import load_dotenv
from flask_pymongo import PyMongo

load_dotenv()

DATABASE_URL=os.environ.get('DATABASE_URL')

app=Flask(__name__)
app.config['MONGO_URI'] = DATABASE_URL
mongo = PyMongo(app)

@app.route('/')
def api_endpoint():
	# mars = mongo.db.mars.find_one()
	# results=collection.find()
	# print(mongo.db.getCollectionNames())
	# print(DATABASE_URL)
	results=list(mongo.db.everything_14ers_db.find())
	for each_result in results[:5]: 
		print(each_result.__dict__)
	# print(results[0])
	# return jsonify([each_result['name'] for each_result in results])

	return len(results)

# @app.route('/insert')
# def insert():
# 	mongo.db.kevin_test_thank_you.insert({'name': 'this is a test'})
# 	return 'SUCCESS'

if __name__=='__main__': 
	app.run()