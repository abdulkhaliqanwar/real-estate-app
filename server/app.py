#!/usr/bin/env python3

from flask import Flask, jsonify, request, session
from flask_restful import Resource, Api
from flask_cors import CORS
from models import db, User, Property, Booking
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"  # replace with a strong secret
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Init extensions
db.init_app(app)
api = Api(app)
CORS(app, supports_credentials=True)  # ✅ Allow frontend to talk to backend

@app.route("/")
def index():
    return jsonify({"message": "Project Server is Running 🚀"})


# ====================== RESOURCES ======================

class Users(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict() for user in users], 200

    def post(self):
        data = request.get_json()
        try:
            new_user = User(username=data["username"], email=data["email"])
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400


class Properties(Resource):
    def get(self):
        props = Property.query.all()
        return [prop.to_dict() for prop in props], 200

    def post(self):
        data = request.get_json()
        try:
            new_prop = Property(
                title=data["title"],
                location=data["location"],
                price=float(data["price"]),
                image_url=data["image_url"],  # ✅ Make sure image can be posted
                user_id=int(data["user_id"])
            )
            db.session.add(new_prop)
            db.session.commit()
            return new_prop.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400


class Bookings(Resource):
    def get(self):
        bookings = Booking.query.all()
        return [b.to_dict() for b in bookings], 200

    def post(self):
        data = request.get_json()
        try:
            new_booking = Booking(
                check_in=data["check_in"],
                check_out=data["check_out"],
                user_id=int(data["user_id"]),
                property_id=int(data["property_id"])
            )
            db.session.add(new_booking)
            db.session.commit()
            return new_booking.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400


class BookingById(Resource):
    def get(self, id):
        booking = Booking.query.get(id)
        if booking:
            return booking.to_dict(), 200
        return {"error": "Booking not found"}, 404

    def patch(self, id):
        booking = Booking.query.get(id)
        if not booking:
            return {"error": "Booking not found"}, 404

        data = request.get_json()
        try:
            if "check_in" in data:
                booking.check_in = data["check_in"]
            if "check_out" in data:
                booking.check_out = data["check_out"]
            db.session.commit()
            return booking.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400

    def delete(self, id):
        booking = Booking.query.get(id)
        if not booking:
            return {"error": "Booking not found"}, 404
        db.session.delete(booking)
        db.session.commit()
        return {}, 204


# ====================== SESSION AUTH ======================

@app.post("/api/login")
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if user:
        session["user_id"] = user.id
        return user.to_dict(), 200
    return {"error": "Invalid username"}, 401


@app.get("/api/check_session")
def check_session():
    user_id = session.get("user_id")
    if user_id:
        user = User.query.get(user_id)
        return user.to_dict(), 200
    return {"error": "Unauthorized"}, 401


@app.delete("/api/logout")
def logout():
    session["user_id"] = None
    return {}, 204


# ====================== ROUTES REGISTER ======================

api.add_resource(Users, "/api/users")
api.add_resource(Properties, "/api/properties")
api.add_resource(Bookings, "/api/bookings")
api.add_resource(BookingById, "/api/bookings/<int:id>")

# ====================== RUN ======================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5555)), debug=True)
