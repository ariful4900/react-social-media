import React, { useEffect } from "react";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { setFriends } from "../../state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Fried List
      </Typography>
      <Box display={"flex"} flexDirection="column" gap="1.5rem">
        {
          friends.length> 0 ? (friends.map((friend)=>(
            <Friend
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
        ))):(<Typography variant="h5">You Have No Friend here</Typography>)
        }
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
