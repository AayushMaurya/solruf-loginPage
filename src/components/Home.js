import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Home = (props) => {

    const navigate = useNavigate();
    const [newName, setNewName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);   // which image is going to upload
    const [profileUrl, setProfileUrl] = useState();         // url for the profile image

    const auth = getAuth();

    useEffect(() => {
        console.log(props);
        if (!props.isAuthenticate)
            navigate("/login");
    }, []);

    // to check if their is some profile image
    useEffect(() => {
        const profileRef = ref(storage, `images/${"profile" + props.user.email}`);

        getDownloadURL(profileRef).then((res) => setProfileUrl(res)).catch(err => {
            console.log(err);
            const dummyRef = ref(storage, `images/dummy.jpg`);

            getDownloadURL(dummyRef).then((res) => {
                setProfileUrl(res);
            }).catch(err => console.log(err));
        });

    }, []);

    const signoutHandeler = () => {
        signOut(auth).then(() => {
            console.log("signedout");
            navigate("/login")
        })
            .catch((err) => console.log(err));
    }

    const changeHandler = (e) => {
        setNewName(e.target.value);
    }

    const updateNameHandler = async () => {
        setIsLoading(true);

        await updateProfile(props.user, {
            displayName: newName
        });
        setIsLoading(false);
        setNewName("");
    }

    const uploadImage = () => {

        setIsLoading(true);

        if (imageUpload == null)
            return;

        const imageRef = ref(storage, `images/${"profile" + props.user.email}`);

        uploadBytes(imageRef, imageUpload)
            .then((res) => {
                console.log("image uploaded");
                console.log(res);
                setIsLoading(false);
                setImageUpload(null);

                // changing the profile
                const profileRef = ref(storage, `images/${"profile" + props.user.email}`);

                getDownloadURL(profileRef).then((res) => setProfileUrl(res)).catch(err => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });

    }

    return (
        <div>

            <div className="loginForm">
                <div className="formBody homecont">
                    <div className="row">
                        <h3 className="clientLoginTitle">User Info</h3>
                    </div>

                    <div className="row">
                        <div classsName="col">
                            <img style={{ width: '120px', height: '120px' }} className="imgStyle" src={profileUrl} ></img>
                        </div>
                        <div classsName="col">
                            <h3>Name : {props.user.displayName}</h3>
                            <h3>Email : {props.user.email}</h3>
                        </div>
                    </div>

                    <button className="loginBtn" type="button" onClick={signoutHandeler}>Logout</button>

                    <hr />

                    <div className="row">
                        <h3 className="clientLoginTitle">Edit Details</h3>
                    </div>

                    <div className="row">
                        <input className="inp editinp" type="text" placeholder="enter new name" name="newName" value={newName} onChange={changeHandler} />

                        {!isLoading && (
                            <button className="updateNameBtn" onClick={updateNameHandler}>Update</button>
                        )}
                    </div>

                    <div className="row">
                        <input className="inp editinp" type="file" onChange={event => setImageUpload(event.target.files[0])} />
                        {!isLoading && (
                            <button className="updateNameBtn" onClick={uploadImage}>Upload</button>
                        )}
                    </div>

                </div>

            </div>

        </div>

    )
}

export default Home;