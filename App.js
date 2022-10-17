import React from "react";
import { View } from "react-native";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import AppNavigation from "./AppNavigation";
import store from "./src/redux/store";

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
    </Provider>
  </QueryClientProvider>
);

export default App;
