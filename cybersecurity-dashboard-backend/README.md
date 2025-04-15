# Cybersecurity Dashboard Backend

A Django-based backend for the Cybersecurity Dashboard application, providing RESTful APIs for threat monitoring, honeypot management, and security analytics.

## Features


- RESTful API endpoints for security monitoring

- JWT-based authentication

- Real-time threat detection

- Honeypot management

- Security event logging

- Alert system

- Analytics and reporting

- WebSocket support for real-time updates



## Tech Stack



- Python 3.8+

- Django 5.2

- Django REST Framework

- Django Channels

- JWT Authentication

- SQLite (Development)

- Redis (WebSocket support)



## Prerequisites



- Python 3.8 or higher

- pip (Python package manager)

- Redis server (for WebSocket support)



## Installation



1. Clone the repository:

```bash

git clone <repository-url>

cd cybersecurity-dashboard-backend

```



2. Create and activate a virtual environment:

```bash

# Windows

python -m venv venv

.\venv\Scripts\activate



# Linux/Mac

python3 -m venv venv

source venv/bin/activate

```



3. Install dependencies:

```bash

pip install -r requirements.txt

```



4. Set up environment variables:

Create a `.env` file in the project root with the following variables:

```

DEBUG=True

SECRET_KEY=your-secret-key

DATABASE_URL=sqlite:///db.sqlite3

REDIS_URL=redis://localhost:6379

```



5. Run migrations:

```bash

python manage.py makemigrations

python manage.py migrate

```



6. Create a superuser:

```bash

python manage.py createsuperuser

```



## Running the Server



1. Start Redis server (required for WebSocket support):

```bash

# Windows

redis-server



# Linux/Mac

sudo service redis-server start

```



2. Start the Django development server:

```bash

python manage.py runserver

```



The server will be available at `http://localhost:8000`



## API Documentation



API documentation is available at:

- Swagger UI: `http://localhost:8000/swagger/`

- ReDoc: `http://localhost:8000/redoc/`



## Available Endpoints



### Authentication

- `POST /api/auth/login/` - User login

- `POST /api/auth/register/` - User registration

- `POST /api/auth/refresh/` - Refresh JWT token

- `GET /api/auth/user/` - Get user profile



### Dashboard

- `GET /api/dashboard/stats/` - Get dashboard statistics

- `GET /api/dashboard/activity/` - Get recent activity

- `GET /api/dashboard/stats/attacks/` - Get attack statistics

- `GET /api/dashboard/stats/metrics/` - Get system metrics



### Honeypots

- `GET /api/honeypots/` - List all honeypots

- `POST /api/honeypots/` - Create new honeypot

- `GET /api/honeypots/<id>/` - Get honeypot details

- `PUT /api/honeypots/<id>/` - Update honeypot

- `DELETE /api/honeypots/<id>/` - Delete honeypot



### Events

- `GET /api/events/` - List security events

- `POST /api/events/` - Create new event

- `GET /api/events/<id>/` - Get event details


### Alerts

- `GET /api/alerts/` - List all alerts

- `GET /api/alerts/<id>/` - Get alert details

- `PUT /api/alerts/<id>/` - Update alert status



### Reports

- `GET /api/reports/` - List all reports

- `POST /api/reports/` - Create new report

- `GET /api/reports/<id>/` - Get report details



## Testing



Run tests using:

```bash

python manage.py test

```



## Contributing



1. Fork the repository

2. Create your feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add some amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request



## License



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




## Support


For support, email support@example.com or create an issue in the repository.

