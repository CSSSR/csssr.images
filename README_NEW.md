Opinionated library for handling images.

This library includes helpers for vanilla js, webpack loader, React component

1. На вход конфиг брейкпоинтов:
[
  {
    name: 'mobile.all',
    maxWidth: 767
  },
  {
    name: 'tablet.all',
    minWidth: 768,
    maxWidth: 1280
  },
  {
    name: 'desktop.all',
    minWidth: 1280
  }
]
2. На вход папки с картинками:
myImage/           <- имя картинки
  desktop.all.png  <-|
  mobile.all.png   <-| различные варианты картинки по брейкпоинтам
  tablet.all.png   <-|
3. Импорт через require.context('./myImage') и функцию-хелпер/компонент
4. Во время импорта все ссылки на изображения imgproxy собираем в один json

<picture class="image css-1bv363l e1mofdgw0">
  <source media="(max-width: 767px)" type="image/webp"
          srcset="/_next/static/images/core-values/mobile.all/reliability-c770d411@1x.webp 1x,/_next/static/images/core-values/mobile.all/reliability-6c497195@2x.webp 2x,/_next/static/images/core-values/mobile.all/reliability-67dc4bb0@3x.webp 3x">
  <img
    srcset="/_next/static/images/core-values/desktop.m/reliability-8b8b8b67@1x.png  1x,/_next/static/images/core-values/desktop.m/reliability-a5845164@2x.png 2x,/_next/static/images/core-values/desktop.m/reliability-db64bb29@3x.png 3x"
    src="/_next/static/images/core-values/desktop.m/reliability-8b8b8b67@1x.png"
    alt="Illustration: a man folds a wall of lego">
</picture>

Проблемы:
1. Разработка на локалхосте, запускать докер или делать bypass всей этой логики?
2. Порядок source в picture, первый подошедший используется
3. Picture компонент можно удалить в пользу обобщения
4. Объединить Picture компоненты новые и старые
5. Собирать статистику какие картинки запрашиваются
6. Собирать все урлы и потом по ним проходить после сборки стенда
7. Поправить file-loader

Идеи:
1. Загружать picture тег асинхронно, например, как кусок html
img src='csssr.com/getimage/myimagename'
server.use('/getimage/:imagename', () => {})


Порядок в srcSet не имеет значения
Порядок в source имеет значение, первое подошедшее правило срабатывает
IMGPROXY_MAX_SRC_RESOLUTION=20


Ожидается file-loader перед этим лоадером

Можно потом вынести imgproxy в options loader'а
