import Express from 'express';
import Path from 'path';

const App = Express();

App.use(Express.static(Path.resolve(__dirname, 'public')));

App.listen(80, () => {
    console.log('Web Server Opened.')
})