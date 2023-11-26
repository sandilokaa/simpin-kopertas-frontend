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

const MandatorySaving = () => {

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


    /* -------------------- Get Mandatory Saving -------------------- */

    const [mandatorySavingData, setMandatorySavingData] = useState([]);

    const searchMandatorySavingField = useRef();

    const onSearch = async () => {

        const token = localStorage.getItem("token");

        const getSearchMandatorySavingField = searchMandatorySavingField.current.value;

        const mandatorySavingDataRequest = await axios.get(
            `http://localhost:8080/api/v1/mandatory-saving?name=${getSearchMandatorySavingField}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );


        const getMandatorySavingResponse = await mandatorySavingDataRequest.data;

        setMandatorySavingData(getMandatorySavingResponse.data.handleGetedAllMandatorySaving);
    };

    useEffect(() => {

        onSearch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -------------------- End Get Mandatory Saving -------------------- */


    /* -------------------- Handle Selected Date -------------------- */

    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {

        const selectedDateValue = e.target.value;

        setSelectedDate(selectedDateValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */


    /* -------------------- Handle Create Mandatory Saving -------------------- */

    const [showFormMandatorySaving, setShowFormMandatorySaving] = useState(false);

    const handleCloseFormMandatorySaving = () => setShowFormMandatorySaving(false);
    const handleShowFormMandatorySaving = () => setShowFormMandatorySaving(true);

    const nominalField = useRef();

    const onCreateTransactionMandatorySaving= async () => {

        try {

            const token = localStorage.getItem("token");

            const mandatorySavingPayload = {
                name: user.name,
                nominal: nominalField.current.value,
                depositeDate: selectedDate,
            };

            const mandatorySavingPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/mandatory-saving`,
                mandatorySavingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );
            

            const mandatorySavingPayloadResponse = mandatorySavingPayloadRequest.data;

            enqueueSnackbar(mandatorySavingPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (mandatorySavingPayloadResponse.status) {

                handleCloseFormMandatorySaving();

                window.location.reload("/mandatory-saving");

            }

        } catch (err) {

            enqueueSnackbar('User telah input data (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Mandatory Saving -------------------- */


    /* -------------------- Handle Delete Mandatory Saving By Id -------------------- */

    const onDeleteMandatorySavingById = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const mandatorySavingRequest = await axios.delete(
                `http://localhost:8080/api/v1/mandatory-saving/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const mandatorySavingResponse = await mandatorySavingRequest.data;

            enqueueSnackbar(mandatorySavingResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (mandatorySavingResponse.status) {

                window.location.reload("/mandatory-saving")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Delete Mandatory Saving By Id -------------------- */


    /* -------------------- Get Mandatory Saving By Id -------------------- */

    const [showFormUpdateMandatorySaving, setShowFormUpdateMandatorySaving] = useState(false);
    const [mandatorySavingById, setMandatorySavingById] = useState([]);

    const handleCloseFormUpdateMandatorySaving = () => setShowFormUpdateMandatorySaving(false);

    const handleShowFormUpdateMandatorySaving = async (id) => {

        const token = localStorage.getItem("token");

        const mandatorySavingRequest = await axios.get(
            `http://localhost:8080/api/v1/mandatory-saving/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getMandatorySavingByIdResponse = await mandatorySavingRequest.data;

        setMandatorySavingById(getMandatorySavingByIdResponse.data.handleGetedMandatorySavingById);

        setShowFormUpdateMandatorySaving(true);

        localStorage.setItem("id", id);

        return id;

    };

    /* -------------------- End Get Mandatory By Id -------------------- */


    /* -------------------- Update Mandatory By Id -------------------- */

    const nominalUpdateField = useRef();

    const onUpdateMandatorySaving = async (id) => {

        try {

            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id")

            const updateMandatorySavingPayload = {
                name: user.name,
                nominal: nominalUpdateField.current.value,
                depositeDate: selectedDate,
            };

            const updateMandatorySavingRequest = await axios.put(
                `http://localhost:8080/api/v1/mandatory-saving/${id}`,
                updateMandatorySavingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const updateMandatorySavingResponse = updateMandatorySavingRequest.data;

            enqueueSnackbar(updateMandatorySavingResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateMandatorySavingResponse.status) {

                localStorage.removeItem("id")

                window.location.reload("/mandatory-saving")

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
                        <Button className="btn btn-add-mandatory-saving" onClick={handleShowFormMandatorySaving}> Add Transaction </Button>
                    </Col>
                    <Col className="col-12 col-lg-6 d-flex justify-content-end">
                        <InputGroup className="mb-3 simpin-search-group">
                            <Form.Control
                                className="simpin-search-control"
                                placeholder="Cari transaksi disini..."
                                aria-label="Cari transaksi disini..."
                                aria-describedby="basic-addon2"
                                ref={searchMandatorySavingField}
                            />
                            <Button id="button-addon2" className="btn-search" onClick={onSearch}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

            <Table striped bordered hover className="simpin-mandatory-saving-table">
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
                {mandatorySavingData.map((mandatorySaving, index) =>
                    <tbody key={mandatorySaving.id}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{mandatorySaving.name}</td>
                            <td>{mandatorySaving.User.memberNumber}</td>
                            <td>{mandatorySaving.depositeDate}</td>
                            <td>{CurrencyFormatter(mandatorySaving.nominal)}</td>
                            <td>
                                <i className="bi bi bi-pencil-square" onClick={() => handleShowFormUpdateMandatorySaving(mandatorySaving.id)}></i>
                                <i className="bi bi-trash" onClick={() => onDeleteMandatorySavingById(mandatorySaving.id)}></i>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>

            {/* ----------------- Modal Form Create Mandatory Saving ----------------- */}

            <Modal show={showFormMandatorySaving} onHide={handleCloseFormMandatorySaving} aria-labelledby="contained-modal-title-vcenter" centered>
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
                        <Button variant="secondary" onClick={handleCloseFormMandatorySaving}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onCreateTransactionMandatorySaving}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Create Mandatory Saving ----------------- */}


                {/* ----------------- Modal Form Update Mandatory Saving ----------------- */}

            <Modal show={showFormUpdateMandatorySaving} onHide={handleCloseFormUpdateMandatorySaving} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={mandatorySavingById ? mandatorySavingById.name : null} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Deposite Date</Form.Label>
                                <Form.Control type="date" onChange={handleDateChange} defaultValue={mandatorySavingById ? mandatorySavingById.depositeDate : null} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nominal</Form.Label>
                                <Form.Control type="number" defaultValue={mandatorySavingById ? mandatorySavingById.nominal : null} ref={nominalUpdateField} autoComplete="off"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormUpdateMandatorySaving}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdateMandatorySaving}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Update Mandatory Saving ----------------- */}


            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default MandatorySaving;