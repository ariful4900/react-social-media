import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPost } from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import FlexBetween from "../../components/FlexBetween";
import {
  
  ChatBubbleOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePatch,
  userPcturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggeInUserId = useSelector((state) => state.user._id);
  const isLinked = Boolean(likes[loggeInUserId]);
  const likeCount = Object.keys(likes).length;

  const main = palette.neutral.main;
  const primary = palette.primary;

  const pathLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggeInUserId }),
    });
    
    const updatePost = await response.json();
    dispatch(setPost({ post: updatePost }));
  };

  return (
    <WidgetWrapper>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPcturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePatch && (
        <img
          width={"100%"}
          height={"auto"}
          alt="post"
          src={`http://locahost:3001/assets/${picturePatch}`}
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
          }}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/**Like Section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={pathLike}>
              {isLinked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteOutlined  />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/**Comments Section */}
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography> 
          </FlexBetween>

        </FlexBetween>
        <IconButton>
          <ShareOutlined/>
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box 
        mt={"0.5rem"}

        >
          {comments.map((comment, i)=>(
            <Box key={`${name}-${i}`}>
              <Divider/>
              <Typography sx={{color:main, m:"0.5rem 0", pl:"1rem"}}>
                {comment}
              </Typography>
            </Box>
          ))}

        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
