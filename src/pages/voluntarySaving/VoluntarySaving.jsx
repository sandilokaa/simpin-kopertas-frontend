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

const VoluntarySaving = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* -------------------- Handle Selected Date -------------------- */

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleDateChange = (e) => {

        const selectedDateValue = e.target.value;

        setSelectedDate(selectedDateValue);

    };

    const handleMonthChange = (e) => {

        const selectedMonthValue = e.target.value;

        setSelectedMonth(selectedMonthValue);

    };

    const handleYearChange = (e) => {

        const selectedYearValue = e.target.value;

        setSelectedYear(selectedYearValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */


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


    /* -------------------- Get Voluntary Saving -------------------- */

    const [voluntarySavingData, setVoluntarySavingData] = useState([]);

    const onSearch = async () => {

        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        const voluntarySavingDataRequest = await axios.get(
            `http://localhost:8080/api/v1/${userId}/voluntary-saving?depositeDate=${selectedYear}-${selectedMonth}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );


        const getVoluntarySavingResponse = await voluntarySavingDataRequest.data;

        setVoluntarySavingData(getVoluntarySavingResponse.data.handleGetedVoluntarySavingByUserId);
    };

    useEffect(() => {

        onSearch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onDisplayedFullData = async() => {

        window.location.reload('/mandatory-saving')
        
    };

    /* -------------------- End Get Voluntary Saving -------------------- */


    /* -------------------- Handle Create Voluntary Saving -------------------- */

    const [showFormVoluntarySaving, setShowFormVoluntarySaving] = useState(false);

    const handleCloseFormVoluntarySaving = () => setShowFormVoluntarySaving(false);
    const handleShowFormVoluntarySaving = () => setShowFormVoluntarySaving(true);

    const nominalField = useRef();

    const onCreateTransactionVoluntarySaving= async () => {

        try {

            const token = localStorage.getItem("token");

            const voluntarySavingPayload = {
                name: user.name,
                nominal: nominalField.current.value,
                depositeDate: selectedDate,
            };

            const voluntarySavingPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/voluntary-saving`,
                voluntarySavingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );
            

            const voluntarySavingPayloadResponse = voluntarySavingPayloadRequest.data;

            enqueueSnackbar(voluntarySavingPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (voluntarySavingPayloadResponse.status) {

                handleCloseFormVoluntarySaving();

                window.location.reload("/voluntary-saving");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Voluntary Saving -------------------- */


    /* -------------------- Handle Delete Voluntary Saving By Id -------------------- */

    const onDeleteVoluntarySavingById = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const voluntarySavingRequest = await axios.delete(
                `http://localhost:8080/api/v1/voluntary-saving/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const voluntarySavingResponse = await voluntarySavingRequest.data;

            enqueueSnackbar(voluntarySavingResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (voluntarySavingResponse.status) {

                window.location.reload("/voluntary-saving")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Delete Voluntary Saving By Id -------------------- */


    /* -------------------- Get Voluntary Saving By Id -------------------- */

    const [showFormUpdateVoluntarySaving, setShowFormUpdateVoluntarySaving] = useState(false);
    const [voluntarySavingById, setVoluntarySavingById] = useState([]);

    const handleCloseFormUpdateVoluntarySaving = () => setShowFormUpdateVoluntarySaving(false);

    const handleShowFormUpdateVoluntarySaving = async (id) => {

        const token = localStorage.getItem("token");

        const voluntarySavingRequest = await axios.get(
            `http://localhost:8080/api/v1/voluntary-saving/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getVoluntarySavingByIdResponse = await voluntarySavingRequest.data;

        setVoluntarySavingById(getVoluntarySavingByIdResponse.data.handleGetedVoluntarySavingById);

        setShowFormUpdateVoluntarySaving(true);

        localStorage.setItem("id", id);

        return id;

    };

    /* -------------------- End Get Voluntary Saving By Id -------------------- */


    /* -------------------- Update Voluntary Saving By Id -------------------- */

    const nominalUpdateField = useRef();

    const onUpdateVoluntarySaving = async (id) => {

        try {

            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id")

            const updateVoluntarySavingPayload = {
                name: user.name,
                nominal: nominalUpdateField.current.value,
                depositeDate: selectedDate,
            };

            console.log(updateVoluntarySavingPayload);

            const updateVoluntarySavingRequest = await axios.put(
                `http://localhost:8080/api/v1/voluntary-saving/${id}`,
                updateVoluntarySavingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const updateVoluntarySavingResponse = updateVoluntarySavingRequest.data;

            enqueueSnackbar(updateVoluntarySavingResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateVoluntarySavingResponse.status) {

                localStorage.removeItem("id")

                window.location.reload("/voluntary-saving")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Update Voluntary Saving By Id -------------------- */


    return isLoggedIn ? (

        <HomeLayout>
            <Container>

                <Row>
                    <Col className="col-12 col-lg-6 d-flex justify-content-start">
                        <Button className="btn btn-add-voluntary-saving" onClick={handleShowFormVoluntarySaving}> Tambah Simpanan </Button>
                    </Col>
                    <Col className="col-12 col-lg-6 d-flex justify-content-end">
                        <InputGroup className="simpin-search-group">
                        <Form.Select aria-label="Default select example" value={selectedYear} onChange={handleYearChange}>
                                <option>Tahun</option>
                                <option value="2022">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" value={selectedMonth} onChange={handleMonthChange}>
                                <option>Bulan</option>
                                <option value="01">Januari</option>
                                <option value="02">Februari</option>
                                <option value="03">Maret</option>
                                <option value="04">April</option>
                                <option value="05">Mei</option>
                                <option value="06">Juni</option>
                                <option value="07">Juli</option>
                                <option value="08">Agustus</option>
                                <option value="09">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </Form.Select>
                            <Button id="button-addon2" className="btn-search" onClick={onSearch}>
                                Search
                            </Button>
                            <Button id="button-addon2" className="btn-cancel" onClick={onDisplayedFullData}>
                                Cancel
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

            <Table striped bordered hover className="simpin-voluntary-saving-table">
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
                {voluntarySavingData.map((voluntarySaving, index) =>
                    <tbody key={voluntarySaving.id}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{voluntarySaving.name}</td>
                            <td>{voluntarySaving.User.memberNumber}</td>
                            <td>{voluntarySaving.depositeDate}</td>
                            <td>{CurrencyFormatter(voluntarySaving.nominal)}</td>
                            <td>
                                <i className="bi bi bi-pencil-square" onClick={() => handleShowFormUpdateVoluntarySaving(voluntarySaving.id)}></i>
                                <i className="bi bi-trash" onClick={() => onDeleteVoluntarySavingById(voluntarySaving.id)}></i>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>

            {/* ----------------- Modal Form Create Voluntary Saving ----------------- */}

            <Modal show={showFormVoluntarySaving} onHide={handleCloseFormVoluntarySaving} aria-labelledby="contained-modal-title-vcenter" centered>
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
                        <Button variant="secondary" onClick={handleCloseFormVoluntarySaving}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onCreateTransactionVoluntarySaving}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Create Voluntary Saving ----------------- */}


                {/* ----------------- Modal Form Update Voluntary Saving ----------------- */}

            <Modal show={showFormUpdateVoluntarySaving} onHide={handleCloseFormUpdateVoluntarySaving} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={voluntarySavingById ? voluntarySavingById.name : null} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Deposite Date</Form.Label>
                                <Form.Control type="date" onChange={handleDateChange} defaultValue={voluntarySavingById ? voluntarySavingById.depositeDate : null} autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nominal</Form.Label>
                                <Form.Control type="number" defaultValue={voluntarySavingById ? voluntarySavingById.nominal : null} ref={nominalUpdateField} autoComplete="off"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormUpdateVoluntarySaving}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdateVoluntarySaving}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Update Voluntary Saving ----------------- */}


            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default VoluntarySaving;