import "../styles/globals.css"

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

const MyApp = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component  {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
