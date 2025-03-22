"use client";

import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <MantineProvider forceColorScheme="light">{children}</MantineProvider>
        </Provider>
    );
}
