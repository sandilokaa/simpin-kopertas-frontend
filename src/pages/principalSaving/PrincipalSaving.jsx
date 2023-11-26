import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    Table,
    InputGroup,
    Button,
    Form,
    Row,
    Col,
    Modal
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";
import CurrencyFormatter from "../../assets/js/currencyFormatter";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

const PrincipalSaving = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


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


    /* -------------------- Get Principal Saving -------------------- */

    const [principalSavingData, setPrincipalSavingData] = useState([]);

    const searchPrincipalSavingField = useRef();

    const onSearch = async () => {

        const token = localStorage.getItem("token");

        const getSearchPrincipalSavingField = searchPrincipalSavingField.current.value;

        const principalSavingDataRequest = await axios.get(
            `http://localhost:8080/api/v1/principal-saving?name=${getSearchPrincipalSavingField}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );


        const getPrincipalSavingResponse = await principalSavingDataRequest.data;

        setPrincipalSavingData(getPrincipalSavingResponse.data.handleGetedAllPrincipalSaving);
    };

    useEffect(() => {

        onSearch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- End Get Principal Saving -------------------- */


    /* -------------------- Handle Selected Date -------------------- */

    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {

        const selectedDateValue = e.target.value;

        setSelectedDate(selectedDateValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */


    /* -------------------- Handle Create Product Purchase -------------------- */

    const [showFormPrincipalSaving, setShowFormPrincipalSaving] = useState(false);

    const handleCloseFormPrincipalSaving = () => setShowFormPrincipalSaving(false);
    const handleShowFormPrincipalSaving = () => setShowFormPrincipalSaving(true);

    const nominalField = useRef();

    const onCreateTransactionPrincipalSaving= async () => {

        try {

            const token = localStorage.getItem("token");

            const principalSavingPayload = {
                name: user.name,
                nominal: nominalField.current.value,
                depositeDate: selectedDate,
            };

            const principalSavingPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/principal-saving`,
                principalSavingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );
            

            const principalSavingPayloadResponse = principalSavingPayloadRequest.data;

            enqueueSnackbar(principalSavingPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (principalSavingPayloadResponse.status) {

                handleCloseFormPrincipalSaving();

                window.location.reload("/principal-saving");

            }

        } catch (err) {

            enqueueSnackbar('User telah input data (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Product Purchase -------------------- */


    /* -------------------- Handle Delete Principal Saving By Id -------------------- */

    const onDeletePrincipalSavingById = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const principalSavingRequest = await axios.delete(
                `http://localhost:8080/api/v1/principal-saving/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const principalSavingResponse = await principalSavingRequest.data;

            enqueueSnackbar(principalSavingResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (principalSavingResponse.status) {

                window.location.reload("/principal-saving")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Delete Principal Saving By Id -------------------- */


    /* -------------------- Get Principal Saving By Id -------------------- */

    const [showFormUpdatePrincipalSaving, setShowFormUpdatePrincipalSaving] = useState(false);
    const [principalSavingById, setPrincipalSavingById] = useState([]);

    const handleCloseFormUpdatePrincipalSaving = () => setShowFormUpdatePrincipalSaving(false);

    const handleShowFormUpdatePrincipalSaving = async (id) => {

        const token = localStorage.getItem("token");

        const principalSavingRequest = await axios.get(
            `http://localhost:8080/api/v1/principal-saving/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getPrincipalSavingByIdResponse = await principalSavingRequest.data;

        setPrincipalSavingById(getPrincipalSavingByIdResponse.data.handleGetedPrincipalSavingById);

        setShowFormUpdatePrincipalSaving(true);

        localStorage.setItem("id", id);

        return id;

    };

    /* -------------------- End Get Product By Id -------------------- */


    /* -------------------- Update Product By Id -------------------- */

    const nominalUpdateField = useRef();

    const onUpdatePrincipalSaving = async (id) => {

        try {

            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id")

            const updatePrincipalSavingPayload = {
                name: user.name,
                nominal: nominalUpdateField.current.value,
                depositeDate: selectedDate,
            };

            console.log(updatePrincipalSavingPayload);

            const updatePrincipalSavingRequest = await axios.put(
                `http://localhost:8080/api/v1/principal-saving/${id}`,
                updatePrincipalSavingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const updatePrincipalSavingResponse = updatePrincipalSavingRequest.data;

            enqueueSnackbar(updatePrincipalSavingResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updatePrincipalSavingResponse.status) {

                localStorage.removeItem("id")

                window.location.reload("/principal-saving")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Update Product By Id -------------------- */


    return isLoggedIn ? (

        <HomeLayout>
            <Container>

                <Row>
                    <Col className="col-12 col-lg-6 d-flex justify-content-start">
                        <Button className="btn btn-add-principal-saving" onClick={handleShowFormPrincipalSaving}> Add Transaction </Button>
                    </Col>
                    <Col className="col-12 col-lg-6 d-flex justify-content-end">
                        <InputGroup className="mb-3 simpin-search-group">
                            <Form.Control
                                className="simpin-search-control"
                                placeholder="Cari transaksi disini..."
                                aria-label="Cari transaksi disini..."
                                aria-describedby="basic-addon2"
                                ref={searchPrincipalSavingField}
                            />
                            <Button id="button-addon2" className="btn-search" onClick={onSearch}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

            <Table striped bordered hover className="simpin-principal-saving-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Nomor Anggota</th>
                        <th>Tanggal Penyimpanan</th>
                        <th>Nominal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                {principalSavingData.map((principalSaving, index) =>
                    <tbody key={principalSaving.id}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{principalSaving.name}</td>
                            <td>{principalSaving.User.memberNumber}</td>
                            <td>{principalSaving.depositeDate}</td>
                            <td>{CurrencyFormatter(principalSaving.nominal)}</td>
                            <td>
                                <i className="bi bi bi-pencil-square" onClick={() => handleShowFormUpdatePrincipalSaving(principalSaving.id)}></i>
                                <i className="bi bi-trash" onClick={() => onDeletePrincipalSavingById(principalSaving.id)}></i>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>

            {/* ----------------- Modal Form Create Principal Saving ----------------- */}

            <Modal show={showFormPrincipalSaving} onHide={handleCloseFormPrincipalSaving} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" readOnly value={user.name} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Deposite Date</Form.Label>
                                <Form.Control type="date" onChange={handleDateChange} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nominal</Form.Label>
                                <Form.Control type="number" placeholder="Example: 3000000" ref={nominalField} autoComplete="off"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormPrincipalSaving}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onCreateTransactionPrincipalSaving}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Create Principal Saving ----------------- */}


                {/* ----------------- Modal Form Update Principal Saving ----------------- */}

            <Modal show={showFormUpdatePrincipalSaving} onHide={handleCloseFormUpdatePrincipalSaving} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={principalSavingById ? principalSavingById.name : null} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Deposite Date</Form.Label>
                                <Form.Control type="date" onChange={handleDateChange} defaultValue={principalSavingById ? principalSavingById.depositeDate : null} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nominal</Form.Label>
                                <Form.Control type="number" defaultValue={principalSavingById ? principalSavingById.nominal : null} ref={nominalUpdateField} autoComplete="off"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormUpdatePrincipalSaving}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdatePrincipalSaving}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Update Principal Saving ----------------- */}


            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default PrincipalSaving;