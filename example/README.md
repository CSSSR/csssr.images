# Запуск

Чтобы запустить этот пример, 
нужно предварительно запустить imgproxy локально на 8080 порту командой 
`docker run -e IMGPROXY_MAX_SRC_RESOLUTION=20 -p 8080:8080 -it darthsim/imgproxy`,
затем выполнить `npm run run-example` из корня проекта 
и открыть в браузере http://localhost:8081/.
