export const SearchInput = ({searchTerm, handleSearchChange}) => {
	return (
		<div>
			filter shown with{" "}
			<input type="text" value={searchTerm} onChange={handleSearchChange} />
		</div>
	);
};
