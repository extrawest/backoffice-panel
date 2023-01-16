import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import AppRoutes from "../routes";
import { theme } from "@backoffice-panel-app/antapplib";

export const App = () => {
  return (
    <ConfigProvider
	theme={theme}
    >
      <IntlProvider
	locale="en"
	defaultLocale="en"
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>

  );
};

export default App;
