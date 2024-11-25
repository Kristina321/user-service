# User Service on NestJS

## Описание

Этот проект представляет собой сервис на основе NestJS для работы с пользователями. В базе данных может быть более 1 миллиона пользователей. Сервис предоставляет эндпоинт для обновления флага проблем у пользователей и подсчета количества пользователей с флагом проблем.

## Функциональные возможности

- Создание структуры базы данных для пользователей.
- Заполнение базы данных начальными данными.
- Эндпоинт для обновления флага `problems` у пользователей.
- Подсчет количества пользователей, у которых флаг `problems` был установлен в `true`.

## Установка

1. Клонируйте репозиторий:

*git clone <https://github.com/Kristina321/user-service.git>*, *cd user-service*

2. Установите зависимости:

*npm install*

3. Настройте подключение к базе данных в файле ormconfig.json или typeorm-cli.ts

## Миграции
1. Создайте миграцию для создания структуры базы данных:
*npx typeorm-ts-node-commonjs migration:create src/migrations/CreateUserTable*

2. Отредактируйте сгенерированный файл миграции, чтобы включить начальные данные.

```
Тело класса замените на:

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
      "id" SERIAL NOT NULL,
      "firstName" character varying NOT NULL,
      "lastName" character varying NOT NULL,
      "age" integer NOT NULL,
      "gender" character varying NOT NULL,
      "problems" boolean NOT NULL DEFAULT false,
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
```
3. Создайте миграцию для заполнения начальными данными:
*npx typeorm-ts-node-commonjs migration:create src/migrations/SeedUsers*

2. Отредактируйте сгенерированный файл миграции, чтобы включить начальные данные.
```
Добавьте импорт: import { User } from '../user/user.entity';

А тело класса замените на:

public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    for (let i = 0; i < 100; i++) {
      const user = userRepository.create({
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        age: Math.floor(Math.random() * (80 - 18 + 1)) + 18,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        problems: Math.random() > 0.5,
      });
      await userRepository.save(user);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user"`);
  }

В цикле, где i < 100, вместо 100 поставьте необходимое вам количество пользователей.
Значение свойства age можно переопределить по своим параметрам, оно соответствует: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
По умолчанию стоит возраст от 18 до 80.
```
3. Примените миграции:

*npm run migration:run*

## Запуск приложения

Запустите приложение *npm run start*

## Использование
```
Эндпоинт для обновления флага problems
URL: http://localhost:3000/users/fix-problems

Метод: PATCH
```

Обновляет флаг problems у всех пользователей, у которых он установлен в true, и возвращает количество обновленных пользователей.

