module.exports.healthcheck = async () => {
  return {
    body: 'All good from plerion-beers service.',
    statusCode: 200
  }
}
