import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";

export const App = () => {
  return (
    <IntlProvider
	locale="en"
	defaultLocale="en"
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
