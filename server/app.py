
import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from extensions import db, migrate
from models import User, Property, Booking

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SESSION_TYPE'] = 'filesystem'

# Init extensions
db.init_app(app)
migrate.init_app(app, db)
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    return {"message": "Server is running!"}

@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([p.to_dict() for p in properties])

@app.route('/api/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    property = Property.query.get_or_404(property_id)
    return jsonify(property.to_dict())

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:
        session['user_id'] = user.id
        return jsonify({'message': 'Logged in successfully', 'user': user.to_dict()}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'user': new_user.to_dict()}), 201

@app.route('/api/bookings', methods=['POST'])
def book_property():
    data = request.get_json()
    booking = Booking(
        user_id=data['user_id'],
        property_id=data['property_id'],
        check_in=data['check_in'],
        check_out=data['check_out']
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({'message': 'Booking successful'}), 201

if __name__ == '__main__':
    app.run(debug=True)