## Współlokator app (frontend)

### Get app

1. git clone <repo-link> vue-wspollokator-app
2. cd vue-wspollokator-app

### Run app on dev server

1. npm install
2. npm run dev

(Don't run app by docker-compose up on dev server)

### Run app on production

1. Change VITE_API_URL in .env
2. docker-compose -f docker-compose-prod.yml up --build