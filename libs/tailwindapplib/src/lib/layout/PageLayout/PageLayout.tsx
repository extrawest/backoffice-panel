import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { Alert, Loader } from "../../components";
import { pageLayoutTexts } from "./PageLayout.texts";
import { PageLayoutProps } from "./PageLayout.types";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	const intl = useIntl();
	return (
		<>
			<div className="layout-wrapper">
				{children}
			</div>
			{isLoading &&
				<div className="layout-backdrop">
					<Loader />
				</div>
			}
			{error &&
				<Alert
					isOpen={!!error}
					title={intl.formatMessage(pageLayoutTexts.errorTitleText)}
					subtitle={error.message}
				/>
			}
		</>
	);
};

export default PageLayout;
