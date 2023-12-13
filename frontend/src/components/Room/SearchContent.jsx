import TopBar from "./TopBar";

const SearchContent = (props) => {
  const { userRooms } = props;

  return (
    <>
      <TopBar title="Search" roomList={userRooms} />
    </>
  );
};

export default SearchContent;
