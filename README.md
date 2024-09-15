# Business card template

## Description
this is a simple template for your business cards it has a minimal design and was made purely for the sake of signing people up for electives inside my college, the code for the main page except for the fonts and the submission form was made using v0.dev, the code for submitting the data was made using LLM, and everything that doesn't go into it like writing to the database etc was done by me.

Project launced on vercel.com


## Instaltion

First, create an .env file 

```
touch .env
```

now add environment variables this variables i get from vercel_db postgress
```t
POSTGRES_URL="URL"
POSTGRES_PRISMA_URL="PRISMA_URL"
POSTGRES_URL_NO_SSL="URL_NO_SSL"
POSTGRES_URL_NON_POOLING="POLLING"
POSTGRES_USER="USER"
POSTGRES_HOST="HOST"
POSTGRES_PASSWORD="PASSWORD"
POSTGRES_DATABASE="DATABASE"
```

### init prisma & next
Install dependency 
node version v22.8.0
```bash
npm install
```

init db
```bash
npx prisma init
```

make migrations

```bash
npx prisma migrate dev --name init          
```

### run 
From bash
```bash
npm run dev
```

From docker

Soon