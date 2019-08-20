const aboutRouter = (req, res) => {
res.writeHeader(200, {'Content-type': 'text/html'});
res.write('<h1>About Page</h1>');
res.end();
}

module.exports = aboutRouter;