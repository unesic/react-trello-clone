const reorderLists = (lists, src, dest) => {
	const newLists = [...lists];
	const [moved] = newLists.splice(src.index, 1);
	newLists.splice(dest.index, 0, moved);

	return newLists;
};

const reorderItems = (lists, src, dest) => {
	const newLists = [...lists];

	const srcList = newLists.find((list) => list.id === src.droppableId);
	const desList = newLists.find((list) => list.id === dest.droppableId);
	const srcListIndex = newLists.findIndex((list) => list.id === srcList.id);
	const desListIndex = newLists.findIndex((list) => list.id === desList.id);

	const [moved] = srcList.items.splice(src.index, 1);
	desList.items.splice(dest.index, 0, moved);

	newLists[srcListIndex] = { ...srcList };
	newLists[desListIndex] = { ...desList };

	return newLists;
};

const reorderChecklist = (lists, src, dest) => {
	const newLists = [...lists];
	newLists.forEach((list) => {
		list.items.forEach((item) => {
			if (item.id === src.droppableId) {
				const [moved] = item.checklist.splice(src.index, 1);
				item.checklist.splice(dest.index, 0, moved);
			}
		});
	});

	return newLists;
};

const reorder = (lists, type, src, dest) => {
	if (type === "lists") return reorderLists(lists, src, dest);
	else if (type === "items") return reorderItems(lists, src, dest);
	else if (type === "checklist") return reorderChecklist(lists, src, dest);
};

export default reorder;
