const mockedFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=s') {
      return;
    }
    return Promise.reject(new Error('Invalid url'));
  },
});

module.exports = mockedFetch;
