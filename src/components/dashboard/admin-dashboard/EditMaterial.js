import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/components/Sidebar/SideBar.js";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
// import { firestore } from "../../../config/fbConfig";

function EditMaterial() {
  const [newMaterial, setNew] = useState({
    description: "",
    source: "",
    title: ""
  });
  const [categories, setCategory] = useState([]);

  //   useEffect(() => {
  //     let unsubscribe = firestore
  //       .collection("trainingTabNav")
  //       .onSnapshot(snapshot => {
  //         let trainingCategories = snapshot.docs.map(doc => {
  //           return doc.data().navName;
  //         });
  //         setCategory(trainingCategories);
  //       });
  //     return unsubscribe;
  //   }, []);

  let handleChange = e => {
    setNew({ [e.target.name]: e.target.value });
  };

  return (
    <>
      <Sidebar />
      <div className="add-materialons">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h4 text-center">
                      Enter Information for New Training Material
                    </p>
                    <MDBInput
                      type="text"
                      label="heading"
                      value={newMaterial.title}
                      name="title"
                      icon="heading"
                      //   onChange={handleChange}
                    />
                    <MDBInput
                      type="text"
                      label="material description"
                      value={newMaterial.description}
                      name="description"
                      icon="align-justify"
                      onChange={handleChange}
                    />
                    <MDBInput
                      type="text"
                      label="enter a valid URL (https://www.example.com)"
                      value={newMaterial.source}
                      name="source"
                      icon="link"
                      onChange={handleChange}
                    />
                    <MDBDropdown>
                      <MDBDropdownToggle caret color="primary">
                        Select or Add New Category
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        {categories.map(cat => (
                          <MDBDropdownItem>{cat.toLowerCase()}</MDBDropdownItem>
                        ))}
                        <MDBDropdownItem divider />
                        <MDBDropdownItem>Add New Category +</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </form>
                  <MDBBtn color="orange" type="submit">
                    Add Materials
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}

export default EditMaterial;
