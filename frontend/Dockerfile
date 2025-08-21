FROM node:18

WORKDIR /app

# install dependencies only once
COPY package*.json ./
RUN npm install

# don’t copy source here — it’ll come from volume
EXPOSE 5173

# run Vite dev server, with --host so it works outside container
CMD ["npm", "run", "dev", "--", "--host"]