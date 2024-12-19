# Указываем базовый образ
FROM node:20-alpine

# Создаём директорию для приложения
WORKDIR /usr/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в рабочую директорию
COPY server.mjs ./

# Открываем порт, который будет использоваться приложением
EXPOSE 3000

# Команда для запуска приложения
CMD [ "node", "server.mjs" ]
