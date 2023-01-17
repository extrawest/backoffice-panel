import { FC } from "react";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";
import Text from "antd/es/typography/Text";
import { DashboardPageSecondaryHeaderProps } from "./DashboardPageSecondaryHeader.types";

export const DashboardPageSecondaryHeader: FC<DashboardPageSecondaryHeaderProps> = ({
	title,
	subtitle,
	linkTitle,
	linkUrl
}) => {
	return (
		<Row
			justify="space-around"
			align="top"
		>
			<Col span={12}>
				<Title level={3}>{title}</Title>
			</Col>
			<Col
				span={12}
				style={{
					justifyContent: "flex-end",
					display: "flex"
				}}
			>
				<Link href={linkUrl}>{linkTitle}</Link>
			</Col>
			<Col span={24}>
				<Text>{subtitle}</Text>
			</Col>
		</Row>
	);
};

export default DashboardPageSecondaryHeader;
