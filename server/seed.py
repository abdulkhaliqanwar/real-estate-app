#!/usr/bin/env python3

from faker import Faker
from app import app
from models import db, User, Property
import random

fake = Faker()

# 🔥 Online Unsplash image URLs (20 total)
image_urls =[
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
]


with app.app_context():
    print("🌱 Seeding data...")

    Property.query.delete()
    User.query.delete()

    # Create users
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        db.session.add(user)
        users.append(user)

    db.session.commit()

    # Create properties
    for i in range(20):
        property = Property(
            title=fake.catch_phrase(),
            location=fake.address(),
            price=fake.random_int(min=100000, max=1000000),
            image_url=image_urls[i % len(image_urls)],
            user_id=random.choice(users).id
        )
        db.session.add(property)

    db.session.commit()
    print("✅ Done seeding!")
