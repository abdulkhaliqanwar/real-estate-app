from extensions import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    favorites = db.relationship('Property', secondary='favorites', backref='favorited_by')
    properties = db.relationship("Property", backref="user", cascade="all, delete-orphan")
    bookings = db.relationship("Booking", backref="user", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "property_ids": [p.id for p in self.properties],
            "booking_ids": [b.id for b in self.bookings]
        }

class Property(db.Model, SerializerMixin):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bookings = db.relationship("Booking", backref="property", cascade="all, delete-orphan")

    serialize_rules = ("-user.properties", "-bookings.property")

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    check_in = db.Column(db.String, nullable=False)
    check_out = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)

class Favorite(db.Model):
    __tablename__ = "favorites"

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), primary_key=True)
