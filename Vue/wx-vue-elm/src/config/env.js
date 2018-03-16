let baseUrl

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://easy-mock.com/mock/58ff34155e43ae5dbea5fada/elm-test/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://easy-mock.com/mock/58ff34155e43ae5dbea5fada/elm-test/'
}

export {
  baseUrl
}
