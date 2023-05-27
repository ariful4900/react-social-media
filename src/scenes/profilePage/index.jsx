import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import UserWidget from '../widgets/UserWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import FriendListWidget from '../widgets/FriendListWidget';



const ProfilePage = () => {
    const [user, setUser]=useState(null);
    const {userId}=useParams();
    const token = useSelector(state=>state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async()=>{
        const  response = await fetch(`http://localhost:3001/users/${userId}`,{
            method:"GET",
            headers:{Authorization: `Bearer ${token}`}
        })

        const data = await response.json();;
        setUser(data)
    }
    useEffect(()=>{
        getUser();
    },[]) //eslint-disable-line 

    if(!user) return null;
    return (
        <Box>
            <Navbar/>
            <Box
            width={"100%"}
            p={"2rem 6%"}
            display={isNonMobileScreens ?"flex":"block"}
            gap="2rem"
            justifyContent="center"            
            >
                <Box flexBasis={isNonMobileScreens ?"26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box>
                        <FriendListWidget userId={userId} />
                    </Box>
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%": undefined}
                    mt={isNonMobileScreens ? undefined :"2rem"}
                >
                <MyPostWidget picturePath={user.picturePath}/>
                <PostsWidget userId={userId} isProfile/>
                </Box>
                
            </Box>
        </Box>
    );
};

export default ProfilePage;