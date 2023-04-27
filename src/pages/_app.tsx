import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store, { persistedStore } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

// Note: Legacy script | Developer does not use the script temporarily

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistedStore}>
//         <Component {...pageProps} />
//       </PersistGate>
//     </Provider>
//   );
// }
