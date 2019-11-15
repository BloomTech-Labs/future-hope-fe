import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../../../config/fbConfig";
import swal from 'sweetalert'

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MessageIcon from "@material-ui/icons/Message";
import PeopleIcon from "@material-ui/icons/People";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SchoolIcon from "@material-ui/icons/School"
import AddIcon from '@material-ui/icons/Add';
import { Menu, MenuItem, MenuList } from '@material-ui/core';
import "./sidebar.css"



export const MainListItems = props => {

    const [navItems, setNavItems] = useState([])
    const [newCat, setNewCat] = useState({})

    useEffect(() => {
      customLinks()
    }, [])

    const customLinks = async () => {
      let linkArray = []
      const linkRef = firestore.collection('trainingTabNav')
      await linkRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          linkArray.push({
            name: doc.data().navName
          })
        })
      })
      setNavItems(linkArray)
    }

  return (
    

    <List id="naviList" className="navList">
      <ListItem button component={Link} to={"/dashboard"}>
        <ListItemIcon>
          <CalendarTodayIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>

      <ListItem
        button
        component={Link}
        to={
          props.userInfo.userType === "mentor"
            ? "/approved-teachers"
            : "/approved-mentors"
        }
      >
        <ListItemIcon>
          <PeopleIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>

        <ListItemText
          primary={
            props.userInfo.userType === "mentor" ? "Teachers" : "Mentors"
          }
        />
      </ListItem>
      {props.userInfo.userType === "admin" && (
        <ListItem button component={Link} to={"/approved-teachers"}>
          <ListItemIcon>
            <PeopleIcon style={{ color: "#ff9800" }} />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItem>
      )}
      <ListItem button component={Link} to={"/messaging"}>
        <ListItemIcon>
          <MessageIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <LiveHelpIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="FAQs" />
      </ListItem> */}
      <ListItem button component={Link} to={"/update_profile"}>
        <ListItemIcon>
          <AccountBoxIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>
      <List>
        <ListItem button className="trainingBtn" onClick={()=>{
          document.getElementById("naviList").classList.toggle("navList")
          document.getElementById("hiddenmenu").classList.toggle("trainingCategoriesHidden")

        }}>
          <ListItemIcon>
            <SchoolIcon style={{ color: "#ff9800"}} />
          </ListItemIcon>
          <ListItemText primary="Training"/>
        </ListItem>
        <ListItemIcon button className="iconBox">
            <AddIcon style={{ color: "#ff9800"}} onClick={()=>{swal({
              title: "Add a new sub-category",
              content: {
                element: "input",
                attributes: {
                  title: "Add a new sub-category",
                  placeholder: "New category name"                  
                }
              },
              buttons: {
                cancel: true,
                confirm: "Submit"
              }
            }).then( val => {
              if(val){
                swal({
                title: "New category added!",
                icon: "success"
              })}
              
              if(val != null && val != ""){firestore.collection('trainingTabNav').add({navName: val}).then(() =>{if(val != null){window.location.reload()}})}

            })}}/>
          </ListItemIcon>
        <MenuList className="trainingCategories" id="hiddenmenu">
          
          {navItems.map(link => {
            return(
              <MenuItem button className="subCatAlign" component={Link} to={`/training/${link.name.toLowerCase()}`}>
                {link.name}
              </MenuItem>
            )
          })}

        </MenuList>
      </List>
        
    </List>
  );
};

export const SecondaryListItems = props => {
  return (
    <List>
      <ListSubheader inset>Admin</ListSubheader>
      <ListItem button component={Link} to={"/user-approval"}>
        <ListItemIcon>
          <VerifiedUserIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Approve Users" />
      </ListItem>
    </List>
  );
};
