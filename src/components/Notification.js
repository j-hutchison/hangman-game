import React, { useEffect } from "react";
import styles from "./Notification.module.css";

const delay = 1.5;

const Notification = (props) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			props.setShowNotification(() => false);
		}, delay * 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [props]);

	return (
		<div
			className={
				props.showNotification
					? `${styles["notification"]} ${styles["show"]}`
					: `${styles["notification"]} ${styles["hide"]}`
			}
		>
			<span className={styles["notification-message"]}>
				You have already entered this letter
			</span>
		</div>
	);
};

export default Notification;
