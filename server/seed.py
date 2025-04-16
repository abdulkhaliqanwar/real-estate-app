from app import app
from extensions import db
from models import User, Property
from faker import Faker
import random

fake = Faker()

image_urls = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
]

with app.app_context():
    print("🌱 Seeding data...")

    db.drop_all()
    db.create_all()

    users = []
    for _ in range(5):
        user = User(email=fake.email(), password=fake.password())
        db.session.add(user)
        users.append(user)

    db.session.commit()

    for _ in range(10):
        prop = Property(
            title=fake.catch_phrase(),
            location=fake.address(),
            price=random.randint(100000, 1000000),
            image_url=random.choice(image_urls),
            user_id=random.choice(users).id
        )
        db.session.add(prop)

    db.session.commit()
    print("✅ Done seeding!")
