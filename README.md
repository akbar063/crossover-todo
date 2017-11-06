# xo_todo
API for Crossover Todo Application

Reports: 
- I could have follow the component file structure as I use for Angular 2,4 apps but this current MV* file structure suits better with AngularJs.
- I have chosen Angular material as I think material designing is the best UI/UX for web Applications
- I also add index.js line 38 code to integrate front end routes when there will be no route for request. (This code will look backend route first then if not found it will redirect to front end app)
- 2 routes in app 1: login 2: todo (authenticated route)
- 2 controller in app 1: login 2: todo
- 2 services in app 1: auth 2: todo
- 2 directives 1: autofocus 2: drag and drop (developed by my self using HTML5 api)
- smart notification on every action in app in form of Angular Material toast.(Angular material directive)
- unit testing of services


Setup:
   - Download the backend code from this link. 
   - MongoDb Deamon should be running.
   - Update the DB details in config.js
   - Run ‘npm install’ to download npm packages. Run ‘npm start’ to start the backend API.
   - By Default the backend will start web server on http://localhost:3000/

Run `karma start` for unit testing

front end developer:  [umimehar](https://github.com/umimehar)