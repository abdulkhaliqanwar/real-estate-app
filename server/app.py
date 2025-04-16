from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from server.models import db, User, Property, Booking

app = Flask(__name__)
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance/app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.secret_key = 'secret123'

# ✅ Enable CORS before routes
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# ✅ Initialize extensions
Session(app)
db.init_app(app)
migrate = Migrate(app, db)

# ✅ Health check
@app.route('/')
def home():
    return jsonify({"message": "Server is running ✅"})

# ✅ Signup route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        role=data.get('role', 'user')  # Default role: user
    )
    new_user.set_password(data['password'])  # 🔒 Hash password
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully', 'user': new_user.to_dict()}), 201

# ✅ Login route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# ✅ Get all properties
@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([p.to_dict() for p in properties]), 200

# ✅ Get single property
@app.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    prop = Property.query.get_or_404(id)
    return jsonify(prop.to_dict()), 200

# ✅ Create booking
@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    booking = Booking(
        check_in=data['check_in'],
        check_out=data['check_out'],
        user_id=data['user_id'],
        property_id=data['property_id']
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({'message': 'Booking successful'}), 201

# ✅ Get all bookings
@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([b.to_dict() for b in bookings]), 200


# ✅ Delete booking
@app.route('/api/bookings/<int:id>', methods=['DELETE'])
def delete_booking(id):
    booking = Booking.query.get_or_404(id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"message": "Booking deleted"}), 200

# ✅ Run server
if __name__ == '__main__':
    app.run(port=5555, debug=True)
