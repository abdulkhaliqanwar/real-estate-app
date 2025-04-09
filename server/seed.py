#!/usr/bin/env python3

from faker import Faker
from app import app
from models import db, User, Property
from random import choice

fake = Faker()

image_urls = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1572120360610-d971b9b63962",
    "https://images.unsplash.com/photo-1598928506311-8a593c7486c1",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1600585152782-cb4c3503f3c9"
]

with app.app_context():
    print("Clearing db...")
    db.drop_all()
    db.create_all()

    print("Seeding users...")
    user = User(username="admin", email="admin@example.com")
    db.session.add(user)
    db.session.commit()

    print("Seeding properties...")
    for i in range(5):
        prop = Property(
            title=fake.street_name(),
            location=fake.city(),
            price=round(fake.random_number(digits=5), -2),
            image_url=choice(image_urls),
            user_id=user.id
        )
        db.session.add(prop)

    db.session.commit()
    print("✅ Done seeding!")
