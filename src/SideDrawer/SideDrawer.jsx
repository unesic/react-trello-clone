import React, { useState, useContext, useCallback } from "react";
import { FiSettings, FiX } from "react-icons/fi";

import { AppContext } from "../App/App";
import Modal from "../Modal/Modal";
import ModeAndTransparency from "./ModeAndTransparency/ModeAndTransparency";
import Colors from "./Colors/Colors";
import Images from "./Images/Images";
import { ButtonToggle, ButtonClose, SideDrawerModal } from "./SideDrawer.module.css";

const SideDrawer = () => {
	const context = useContext(AppContext);
	const { mode, transparency } = context.appStyle;
	const [modalVisible, setModalVisible] = useState(false);
	const COLORS = [
		"#264653",
		"#2a9d8f",
		"#e9c46a",
		"#f4a261",
		"#e76f51",
		"#006d77",
		"#4ecdc4",
		"#ffffff",
		"#000000",
	];

	const openModal = useCallback(() => {
		setModalVisible(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible]);

	const closeModal = useCallback(() => {
		setModalVisible(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible]);

	const setBackgroundColor = useCallback((background) => {
		context.dispatch({
			type: "SET_BACKGROUND_COLOR",
			payload: background,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setBackgroundImage = useCallback((background) => {
		context.dispatch({
			type: "SET_BACKGROUND_IMAGE",
			payload: background,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<button onClick={openModal} className={ButtonToggle}>
				<FiSettings />
			</button>
			<Modal visible={modalVisible} close={closeModal} classes={SideDrawerModal}>
				<button onClick={closeModal} className={ButtonClose}>
					<FiX />
				</button>
				<ModeAndTransparency mode={mode} transparency={transparency} />
				<Colors colors={COLORS} onColorPick={setBackgroundColor} />
				<Images onImagePick={setBackgroundImage} />
			</Modal>
		</>
	);
};

export default SideDrawer;