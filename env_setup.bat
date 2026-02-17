if exist allure-results rmdir /s /q allure-results
npm install
npm install -D allure-playwright    
npm install -g allure-commandline --force
npx playwright install