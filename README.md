
```bash
$ npm install
# watch mode
$ npm run start:dev
```

перейти за писиланням:</br>
http://localhost:3000/get_data_1</br>

 очікується:</br>
![img.png](img.png)</br>
один токен для всіх промісів в Promise.all(promises)</br>

по факту:</br>
![img_1.png](img_1.png)</br>
для кожного з 5-ти промісів окремі токени</br>

для збільшення часу життя токена першого сервісу в TokenController на 13 стрічці збільшини число</br>
</br>
варіанти рішення:</br>
1. при запуску сервісу з токеном тримати постійно актуальний токен та рефрешити при завершенні життя токену
2. запускати отримання токену перед використанням Promise.all(promises)</br>
