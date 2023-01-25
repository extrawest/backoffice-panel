import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { ProgressSpinner } from "primereact/Progressspinner";
import { Toast } from "primereact/Toast";
import { PageLayoutProps } from "./PageLayout.types";
import { pageLayoutTexts } from "./PageLayout.texts";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	const intl = useIntl();
	const toastRef = useRef<Toast>(null);
	useEffect(() => {
		if (!toastRef.current || !error) return;

		toastRef.current.show({
			severity: "error",
			summary: intl.formatMessage(pageLayoutTexts.errorTitleText),
			detail: error.message,
			life: 3000
		});
	}, [error, toastRef]);

	return (
		<>
			<div
				className="flex justify-content-center align-items-center page-layout"
			>
				{children}
			</div>
			{isLoading &&
				<div
					className="flex justify-content-center align-items-center page-layout backdrop"
				>
					<ProgressSpinner />
				</div>
			}
			<Toast
				ref={toastRef}
				position="bottom-left"
			/>
		</>
	);
};

export default PageLayout;
