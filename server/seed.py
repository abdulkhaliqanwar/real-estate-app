#!/usr/bin/env python3

from faker import Faker
from app import app
from models import db, User, Property

fake = Faker()

# ✅ 20 Unique Unsplash Image URLs (one for each property)
image_urls = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1572120360610-d971b9b63962",
    "https://images.unsplash.com/photo-1598928506311-8a593c7486c1",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1600585152782-cb4c3503f3c9",
    "https://images.unsplash.com/photo-1600585154314-48f14a41e4f5",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1542315192-1f61a1779022",
    "https://images.unsplash.com/photo-1600585154171-d7bbd763c4be",
    "https://images.unsplash.com/photo-1600585152953-6c0f84cf2482",
    "https://images.unsplash.com/photo-1580587771542-4c99cd9e000d",
    "https://images.unsplash.com/photo-1572288049224-84e3cd1636eb",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed03",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1617103678854-f62c700b98f1",
    "https://images.unsplash.com/photo-1629994408520-dfc7f22b84da",
    "https://images.unsplash.com/photo-1613963932306-e9d41b5a7c44",
    "https://images.unsplash.com/photo-1613545325278-d52e19909725",
    "https://images.unsplash.com/photo-1575320181282-44a8a3b3028d",
    "https://images.unsplash.com/photo-1600585152814-1ff9fede3795"
]

with app.app_context():
    print("🧨 Clearing database...")
    db.drop_all()
    db.create_all()

    print("👤 Seeding user...")
    user = User(username="admin", email="admin@example.com")
    db.session.add(user)
    db.session.commit()

    print("🏠 Seeding 20 properties...")
    for i in range(20):
        prop = Property(
            title=fake.street_name(),
            location=fake.city(),
            price=round(fake.pyint(min_value=30000, max_value=150000), -2),
            image_url=image_urls[i],  # ✅ One unique image per property
            user_id=user.id
        )
        db.session.add(prop)

    db.session.commit()
    print("✅ Done seeding 20 properties with unique images!")
