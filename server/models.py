# server/models.py
from config import db
from sqlalchemy_serializer import SerializerMixin


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)

    properties = db.relationship("Property", backref="user", cascade="all, delete-orphan")
    bookings = db.relationship("Booking", backref="user", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # Only include property and booking IDs (avoid full recursion)
            "property_ids": [p.id for p in self.properties],
            "booking_ids": [b.id for b in self.bookings]
        }

class Property(db.Model, SerializerMixin):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)  # ✅ NEW

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bookings = db.relationship("Booking", backref="property", cascade="all, delete-orphan")

    serialize_rules = ("-user.properties", "-bookings.property")


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "location": self.location,
            "price": self.price,
            "user_id": self.user_id,
            "booking_ids": [b.id for b in self.bookings],
            "image_url": self.image_url
   }


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    check_in = db.Column(db.String, nullable=False)
    check_out = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "check_in": self.check_in,
            "check_out": self.check_out,
            "user_id": self.user_id,
            "property_id": self.property_id
        }
