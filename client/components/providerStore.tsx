"use client";
import { permistor, store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={permistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
