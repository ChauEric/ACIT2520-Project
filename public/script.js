function keywordToImage(keyword) {
  const url =
    '<https://api.unsplash.com/search/photos?page=1&query=${keyword}>';
  return imageURL;
}

app.post('/reminders', (req, res) => {
  const newReminders = {
    id: 1,
    title: req.body.title,
    description: req.body.description,
    keyword: keywordToImage(req.body.keyword),
    completed: false,
  };
  Database.reminders.push(newReminders);
});
