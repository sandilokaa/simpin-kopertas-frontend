import React, { useState, useEffect, useRef } from "react";
import {
    Row,
    Col,
    Container,
    Button,
    Image,
    Modal,
    Form
} from "react-bootstrap";
import ProfileLayout from "../../layouts/profile/ProfileLayout";
import "../../assets/css/style.css";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- Current User -------------------- */

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentUserRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {

                    setUser(currentUserResponse.data.currentUser);

                }

            } catch (err) {

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* -------------------- End Current User -------------------- */


    /* -------------------- Get Religion -------------------- */

    const [religionData, setReligionData] = useState([]);

    useEffect(() => {

        const religionData = async () => {

            const religionDataRequest = await axios.get(
                `http://localhost:8080/api/v1/religion`
            );

            const getReligionResponse = await religionDataRequest.data.data.handleGetedAllReligionData;

            setReligionData(getReligionResponse);
        };

        religionData();

    }, []);

    /* -------------------- End Get Religion -------------------- */


    /* -------------------- Get Gender -------------------- */

    const [genderData, setGenderData] = useState([]);

    useEffect(() => {

        const genderData = async () => {

            const genderDataRequest = await axios.get(
                `http://localhost:8080/api/v1/gender`
            );

            const getGenderResponse = await genderDataRequest.data.data.handleGetedAllGenderData;

            setGenderData(getGenderResponse);
        };

        genderData();

    }, []);

    /* -------------------- End Get Gender -------------------- */


    /* -------------------- Get User Complete Profile Data -------------------- */

    const [completeProfileData, setCompleteProfileData] = useState([]);

    const params = useLocation();
    const userId = (params.pathname).split('/')[2];

    useEffect(() => {

        const getCompleteProfileData = async () => {

            try {

                const token = localStorage.getItem("token");

                const completeProfileRequest = await axios.get(
                    `http://localhost:8080/api/v1/complete-profile/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const completeProfileRequestResponse = completeProfileRequest.data;

                console.log(completeProfileRequestResponse);

                if (completeProfileRequestResponse.status) {

                    setCompleteProfileData(completeProfileRequestResponse.data.getedCompleteProfileById);

                }

            } catch (err) {

                enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            }

        };

        getCompleteProfileData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- End Get User Complete Profile Data -------------------- */


    /* -------------------- Update Profile Specific Data -------------------- */

    const [showFormUpdateProfileSpecific, setShowFormUpdateProfileSpecific] = useState(false);

    const handleCloseFormUpdateProfileSpecific = () => setShowFormUpdateProfileSpecific(false);
    const handleShowFormUpdateProfileSpecific = () => setShowFormUpdateProfileSpecific(true);

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const fileInputRef = useRef();
    const nameField = useRef();
    const emailField = useRef();

    const onUpdateSpecificProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const updateSpecificProfilePayload = new FormData();

            updateSpecificProfilePayload.append("name", nameField.current.value);
            updateSpecificProfilePayload.append("email", emailField.current.value);
            updateSpecificProfilePayload.append("picture", image);

            const updateSpecificProfileRequest = await axios.put(
                `http://localhost:8080/api/v1/complete-profile/${userId}`,
                updateSpecificProfilePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            const updateSpecificProfileResponse = updateSpecificProfileRequest.data;

            enqueueSnackbar(updateSpecificProfileResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateSpecificProfileResponse.status) {

                window.location.reload(`/profile-user/${userId}`)

            }

        } catch (err) {



        }

    };

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    /* -------------------- End Update Profile Specific Data -------------------- */


    /* -------------------- Update Profile General Data -------------------- */

    const [showFormUpdateProfileGeneral, setShowFormUpdateProfileGeneral] = useState(false);
    const [selectedReligion, setSelectedReligion] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const handleCloseFormUpdateProfileGeneral = () => setShowFormUpdateProfileGeneral(false);
    const handleShowFormUpdateProfileGeneral = () => setShowFormUpdateProfileGeneral(true);
    
    const handleSelectReligionChange = (e) => {

        const selectedReligionValue = e.target.value;

        setSelectedReligion(selectedReligionValue);

    };

    const handleSelectGenderChange = (e) => {

        const selectedGenderValue = e.target.value;

        setSelectedGender(selectedGenderValue);

    };

    const memberNumberField = useRef();
    const phoneNumberField = useRef();
    const jobField = useRef();
    const placeOfBirthField = useRef();
    const addressField = useRef();

    const onUpdateGeneralProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const updateGeneralProfilePayload = {
                memberNumber: memberNumberField.current.value,
                phoneNumber: phoneNumberField.current.value,
                religionId: selectedReligion,
                genderId: selectedGender,
                job: jobField.current.value,
                placeOfBirth: placeOfBirthField.current.value,
                address: addressField.current.value
            };

            const updateGeneralProfileRequest = await axios.put(
                `http://localhost:8080/api/v1/complete-profile/${userId}`,
                updateGeneralProfilePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const updateGeneralProfileResponse = updateGeneralProfileRequest.data;

            enqueueSnackbar(updateGeneralProfileResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateGeneralProfileResponse.status) {

                window.location.reload(`/profile-user/${userId}`)

            }

        } catch (err) {

            enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Update Profile General Data -------------------- */

    return isLoggedIn ? (

        <ProfileLayout>
            <Container>
                <h1 className="simpin-title">My Profile</h1>
                <Row id="simpin-specific-profile-user">
                    <Col className="col-12 col-lg-2 d-flex justify-content-start">
                        <Image className="photo-profile-user" src={completeProfileData.User && completeProfileData.User.picture} />
                    </Col>
                    <Col className="col-12 col-lg-8">
                        <div className="specific">
                            <p>{completeProfileData.User && completeProfileData.User.name}</p>
                            <p>{completeProfileData.User && completeProfileData.User.email}</p>
                        </div>
                    </Col>
                    <Col className="col-12 col-lg-2 d-flex justify-content-center">
                        <Button className="btn-edit-profile" onClick={handleShowFormUpdateProfileSpecific}>
                            Edit
                        </Button>
                    </Col>
                </Row>
                <Row id="simpin-general-profile-user">
                    <h1> Personal Information </h1>
                    <Col className="col-12 col-lg-5">
                        <div>
                            <h6>Nomor Anggota</h6>
                            <p>{completeProfileData.User && completeProfileData.User.memberNumber}</p>
                        </div>
                        <div>
                            <h6>No. Handphone</h6>
                            <p>{completeProfileData.User && completeProfileData.User.phoneNumber}</p>
                        </div>
                        <div>
                            <h6>Tanggal Daftar Akun</h6>
                            <p>{completeProfileData.User && completeProfileData.User.registrationDate.split(" ")[0]}</p>
                        </div>
                        <div>
                            <h6>Alamat</h6>
                            <p>{completeProfileData && completeProfileData.address}</p>
                        </div>
                    </Col>
                    <Col className="col-12 col-lg-5">
                        <div>
                            <h6>Jenis Kelamin</h6>
                            <p>{completeProfileData.Gender && completeProfileData.Gender.gender}</p>
                        </div>
                        <div>
                            <h6>Agama</h6>
                            <p>{completeProfileData.Religion && completeProfileData.Religion.religionName}</p>
                        </div>
                        <div>
                            <h6>Pekerjaan</h6>
                            <p>{completeProfileData && completeProfileData.job}</p>
                        </div>
                        <div>
                            <h6>Tempat Lahir</h6>
                            <p>{completeProfileData && completeProfileData.placeOfBirth}</p>
                        </div>
                    </Col>
                    <Col className="col-12 col-lg-2 d-flex justify-content-center">
                        <Button className="btn-edit-profile" onClick={handleShowFormUpdateProfileGeneral}>
                            Edit
                        </Button>
                    </Col>
                </Row>


                {/* ----------------- Modal Form Update Specific Profile ----------------- */}

                <Modal show={showFormUpdateProfileSpecific} onHide={handleCloseFormUpdateProfileSpecific} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Update Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="upload-photo">
                                {preview ? (
                                    <Image className="photo-profile" src={preview} onClick={() => setImage(null)} alt="preview" />
                                ) : (
                                    <Form.Label
                                        className="upload-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fileInputRef.current.click();
                                        }}
                                    ></Form.Label>
                                )}
                                <Form.Control
                                    type="file"
                                    className="form-control-file"
                                    ref={fileInputRef}
                                    defaultValue={completeProfileData.User && completeProfileData.User.picture}
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && file.type.substr(0, 5) === "image") {
                                            setImage(file);
                                        } else {
                                            setImage(null);
                                        }
                                    }}
                                    hidden
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData.User && completeProfileData.User.name} ref={nameField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData.User && completeProfileData.User.email} ref={emailField} autoComplete="off" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormUpdateProfileSpecific}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdateSpecificProfile}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Update Specific Profile ----------------- */}


                {/* ----------------- Modal Form Update General Profile ----------------- */}

                <Modal show={showFormUpdateProfileGeneral} onHide={handleCloseFormUpdateProfileGeneral} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Update Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nomor Anggota</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData.User && completeProfileData.User.memberNumber} ref={memberNumberField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nomor Handphone</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData.User && completeProfileData.User.phoneNumber} ref={phoneNumberField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={handleSelectGenderChange} value={selectedGender}>
                                    <option>{completeProfileData.Gender && completeProfileData.Gender.gender}</option>
                                    {genderData.map((data) =>
                                        <option value={data.id} key={data.id}>{data.gender}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Agama</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={handleSelectReligionChange} value={selectedReligion}>
                                    <option>{completeProfileData.Religion && completeProfileData.Religion.religionName}</option>
                                    {religionData.map((data) =>
                                        <option value={data.id} key={data.id}>{data.religionName}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Pekerjaan</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData && completeProfileData.job} ref={jobField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tempat Lahir</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData && completeProfileData.placeOfBirth} ref={placeOfBirthField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" defaultValue={completeProfileData && completeProfileData.address} ref={addressField} autoComplete="off" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormUpdateProfileGeneral}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdateGeneralProfile}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Update General Profile ----------------- */}


            </Container>
        </ProfileLayout>

    ) : (navigate("/login"));

};

export default Profile;