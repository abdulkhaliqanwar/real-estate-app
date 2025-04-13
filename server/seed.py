#!/usr/bin/env python3

from faker import Faker
from app import app
from models import db, User, Property
import random

fake = Faker()

# 🔥 Online Unsplash image URLs (30 unique property images)
image_urls = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
  "https://images.unsplash.com/photo-1600585152221-93b8f5caa9af",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566752229-250c794f7d36"
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
