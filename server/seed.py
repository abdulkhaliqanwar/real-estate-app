# server/seed.py

from faker import Faker
from extensions import db
from app import app
from models import User, Property, Booking, Favorite
import random

fake = Faker()

image_urls = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
]

with app.app_context():
    print("🌱 Reseeding database...")

    db.drop_all()
    db.create_all()

    # Admin user
    admin = User(username="admin", email="admin@admin.com", role="admin")
    admin.set_password("admin123")
    db.session.add(admin)

    # Regular users
    users = [admin]
    for _ in range(4):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
        )
        user.set_password("password")
        db.session.add(user)
        users.append(user)

    db.session.commit()

    # Properties
    properties = []
    for _ in range(10):
        prop = Property(
            title=fake.catch_phrase(),
            location=fake.city(),
            price=random.randint(50000, 1000000),
            image_url=random.choice(image_urls),
            user_id=random.choice(users).id
        )
        db.session.add(prop)
        properties.append(prop)

    db.session.commit()

    # Bookings
    for _ in range(6):
        booking = Booking(
            check_in="2025-05-01",
            check_out="2025-05-07",
            user_id=random.choice(users).id,
            property_id=random.choice(properties).id
        )
        db.session.add(booking)

    # Favorites — avoid duplicates
    favorite_pairs = set()
    while len(favorite_pairs) < 6:
        u = random.choice(users).id
        p = random.choice(properties).id
        if (u, p) not in favorite_pairs:
            favorite_pairs.add((u, p))
            db.session.add(Favorite(user_id=u, property_id=p))

    db.session.commit()
    print("✅ Done seeding!")
