import React, { useEffect, useRef, useReducer, useGlobal } from "reactn";

import dummyData from "./images-data.json";
import reducer from "./Images.reducer";
import {
	useOnBlur,
	useOnFocus,
	useOnChange,
	useOnKeyUp,
	useSearch,
	// useGetRandom,
	usePickImage,
	useToggleFavorite,
} from "./lib/MainImages.hooks";

import Header from "./lib/ImagesHeader";
import FavoriteImages from "./lib/FavoriteImages";
import PreviousImages from "./lib/PreviousImages";
import MainImages from "./lib/MainImages";

import { Instruction } from "../../../ui/styledComponents";
import Spinner from "../../../ui/Spinner";

import {
	ImagesWrapper,
	ImagesContainer,
	LoadingContainer,
} from "./Images.module.css";

const Images = () => {
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");

	const setBackgroundImage = (image) => {
		setBoardStyle({
			...boardStyle,
			backgroundImage: image,
		});
	};

	const [state, dispatch] = useReducer(reducer, {
		images: dummyData,
		snapshotImages: [],
		prevImages: [],
		favImages: [],
		searchTerm: "",
		isSearching: false,
		searchResults: false,
		loading: false,
		isFocusing: false,
	});

	const prevRef = useRef(false);
	const favRef = useRef(false);

	// const getRandom = useGetRandom(dispatch);
	const search = useSearch(dispatch, state);

	const pickImage = usePickImage(dispatch, state, setBackgroundImage);
	const toggleFavoriteHandler = useToggleFavorite(dispatch, state);

	const onFocusHandler = useOnFocus(dispatch, state);
	const onBlurHandler = useOnBlur(dispatch, state);
	const onChangeHandler = useOnChange(dispatch, state);
	const onKeyUpHandler = useOnKeyUp(dispatch, state, search, onBlurHandler);

	useEffect(() => {
		// getRandom();
	}, []);

	useEffect(() => {
		const localPrevImages = JSON.parse(localStorage.getItem("prevImages"));
		if (localPrevImages && localPrevImages !== null)
			dispatch({
				type: "SET_PREV_IMAGES",
				payload: [...localPrevImages],
			});

		const localFavImages = JSON.parse(localStorage.getItem("favImages"));
		if (localFavImages && localFavImages !== null)
			dispatch({
				type: "SET_FAV_IMAGES",
				payload: [...localFavImages],
			});
	}, []);

	useEffect(() => {
		if (prevRef.current) {
			localStorage.setItem(
				"prevImages",
				JSON.stringify(state.prevImages)
			);
		} else {
			prevRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(state.prevImages)]);

	useEffect(() => {
		if (favRef.current) {
			localStorage.setItem("favImages", JSON.stringify(state.favImages));
		} else {
			favRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(state.favImages)]);

	return (
		<div className={ImagesWrapper}>
			<Header
				searchTerm={state.searchTerm}
				onChange={onChangeHandler}
				onKeyUp={onKeyUpHandler}
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
			/>
			<div className={ImagesContainer}>
				{!state.isSearching ? (
					<>
						<FavoriteImages
							images={state.favImages}
							click={pickImage}
							search={state.searchResults}
							currentImage={boardStyle.backgroundImage.id}
							toggleFavorite={toggleFavoriteHandler}
						/>
						<PreviousImages
							images={state.prevImages}
							click={pickImage}
							search={state.searchResults}
							currentImage={boardStyle.backgroundImage.id}
							toggleFavorite={toggleFavoriteHandler}
						/>
						<MainImages
							images={state.images}
							click={pickImage}
							search={state.searchResults}
							searchTerm={state.searchTerm}
							currentImage={boardStyle.backgroundImage.id}
							toggleFavorite={toggleFavoriteHandler}
						/>
					</>
				) : (
					<div className={LoadingContainer}>
						{state.loading ? (
							<Spinner />
						) : (
							<Instruction>
								Type search term and press enter...
							</Instruction>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Images;
