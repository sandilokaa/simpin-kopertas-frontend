import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    Table,
    Button,
    Form,
    Row,
    Col,
    Modal,
    InputGroup
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";
import CurrencyFormatter from "../../assets/js/currencyFormatter";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

const Loan = () => {

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


    /* -------------------- Get Loan Data -------------------- */

    const [loanData, setLoanData] = useState([]);

    const onSearch = async () => {

        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        const loanDataRequest = await axios.get(
            `http://localhost:8080/api/v1/${userId}/loan?loanDate=${selectedYear}-${selectedMonth}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getLoanResponse = await loanDataRequest.data;

        setLoanData(getLoanResponse.data.handleGetedLoanByUserId);
    };

    useEffect(() => {

        onSearch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDisplayedFullData = async() => {

        window.location.reload('/loan-data')
        
    };

    /* -------------------- End Get Loan Data -------------------- */


    /* -------------------- Get Loan Type -------------------- */

    const [loanTypeData, setLoanTypeData] = useState([]);

    useEffect(() => {

        const loanTypeData = async () => {

            const loanTypeDataRequest = await axios.get(
                `http://localhost:8080/api/v1/loan-type`
            );

            const getLoanTypeResponse = await loanTypeDataRequest.data.data.handleGetedAllLoanTypeData;

            setLoanTypeData(getLoanTypeResponse);
        };

        loanTypeData();

    }, []);

    /* -------------------- End Get Loan Type -------------------- */


    /* -------------------- Handle Create Loan -------------------- */

    const [showFormLoan, setShowFormLoan] = useState(false);
    const [selectedLoanType, setSelectedLoanType] = useState('');

    const handleCloseFormLoan = () => setShowFormLoan(false);
    const handleShowFormLoan = () => setShowFormLoan(true);

    const handleSelectLoanTypeChange = (e) => {

        const selectedLoanValue = e.target.value;

        setSelectedLoanType(selectedLoanValue);

    };

    const nominalField = useRef();
    const installmentAmountField = useRef();

    const onCreateTransactionLoan = async () => {

        try {

            const token = localStorage.getItem("token");

            const loanPayload = {
                name: user.name,
                nominal: nominalField.current.value,
                loanDate: selectedDate,
                typeId: selectedLoanType,
                installmentAmount: installmentAmountField.current.value
            };

            const loanPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/loan`,
                loanPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );


            const loanPayloadResponse = loanPayloadRequest.data;

            enqueueSnackbar(loanPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (loanPayloadResponse.status) {

                handleCloseFormLoan();

                window.location.reload("/loan");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Loan -------------------- */


    /* -------------------- Handle Delete Loan By Id -------------------- */

    const onDeleteLoanById = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const loanRequest = await axios.delete(
                `http://localhost:8080/api/v1/loan/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const loanResponse = await loanRequest.data;

            enqueueSnackbar(loanResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (loanResponse.status) {

                window.location.reload("/loan")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Delete Loan By Id -------------------- */


    /* -------------------- Get Loan By Id -------------------- */

    const [showFormUpdateLoan, setShowFormUpdateLoan] = useState(false);
    const [loanByIdData, setLoanByIdData] = useState([]);

    const handleCloseFormUpdateLoan = () => setShowFormUpdateLoan(false);

    const handleShowFormUpdateLoan = async (id) => {

        const token = localStorage.getItem("token");

        const loanRequest = await axios.get(
            `http://localhost:8080/api/v1/loan/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getLoanByIdResponse = await loanRequest.data;

        console.log(getLoanByIdResponse);

        setLoanByIdData(getLoanByIdResponse.data.handleGetedLoanById);

        setShowFormUpdateLoan(true);

        localStorage.setItem("id", id);

        return id;

    };

    /* -------------------- End Get Loan By Id -------------------- */


    /* -------------------- Handle Update Loan By Id -------------------- */

    const nominalUpdateField = useRef();
    const installmentAmountUpdateField = useRef();

    const onUpdateLoan = async (id) => {

        try {

            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id")

            const updateLoanPayload = {
                name: user.name,
                nominal: nominalUpdateField.current.value,
                loanDate: selectedDate,
                installmentAmount: installmentAmountUpdateField.current.value,
                typeId: selectedLoanType
            };

            const updateLoanRequest = await axios.put(
                `http://localhost:8080/api/v1/loan/${id}`,
                updateLoanPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const updateLoanResponse = updateLoanRequest.data;

            enqueueSnackbar(updateLoanResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateLoanResponse.status) {

                localStorage.removeItem("id")

                window.location.reload("/loan-data")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Update Loan By Id -------------------- */


    return isLoggedIn ? (

        <HomeLayout>
            <Container>

                <Row>
                    <Col className="col-12 col-lg-6 d-flex justify-content-start">
                        <Button className="btn btn-add-loan" onClick={handleShowFormLoan}> Tambah Pinjaman </Button>
                    </Col>
                    <Col className="col-12 col-lg-6 d-flex justify-content-end">
                        <InputGroup className="simpin-search-group">
                            <Form.Select aria-label="Default select example" value={selectedYear} onChange={handleYearChange}>
                                <option>Tahun</option>
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
                                <option value="2013">2013</option>
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

                <Table striped bordered hover className="simpin-loan-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Nomor Anggota</th>
                            <th>Jenis Pinjaman</th>
                            <th>Nominal</th>
                            <th>Periode</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    {loanData.map((loan, index) =>
                        <tbody key={loan.id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{loan.name}</td>
                                <td>{loan.User.memberNumber}</td>
                                <td>{loan.LoanType.type}</td>
                                <td>{CurrencyFormatter(loan.nominal)}</td>
                                <td>{loan.installmentAmount} Bulan</td>
                                <td>
                                    <i className="bi bi bi-pencil-square" onClick={() => handleShowFormUpdateLoan(loan.id)}></i>
                                    <i className="bi bi-trash" onClick={() => onDeleteLoanById(loan.id)}></i>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Table>


                {/* ----------------- Modal Form Create Loan ----------------- */}

                <Modal show={showFormLoan} onHide={handleCloseFormLoan} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Pinjaman</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" readOnly value={user.name} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tipe Pinjaman</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={handleSelectLoanTypeChange} value={selectedLoanType}>
                                    <option>Tipe Pinjaman</option>
                                    {loanTypeData.map((data) =>
                                        <option value={data.id} key={data.id}>{data.type}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tanggal Pinjaman</Form.Label>
                                <Form.Control type="date" onChange={handleDateChange} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nominal</Form.Label>
                                <Form.Control type="number" placeholder="Example: 3000000" ref={nominalField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Angsuran/Periode</Form.Label>
                                <Form.Control type="number" placeholder="Example: 12" ref={installmentAmountField} autoComplete="off" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormLoan}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onCreateTransactionLoan}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Create Loan ----------------- */}


                {/* ----------------- Modal Form Update Loan ----------------- */}

                <Modal show={showFormUpdateLoan} onHide={handleCloseFormUpdateLoan} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Update Pinjaman</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" readOnly value={user.name} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tipe Pinjaman</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={handleSelectLoanTypeChange} value={selectedLoanType}>
                                    <option>Tipe Pinjaman</option>
                                    {loanTypeData.map((data) =>
                                        <option value={data.id} key={data.id}>{data.type}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tanggal Pinjaman</Form.Label>
                                <Form.Control type="date" onChange={handleDateChange} defaultValue={loanByIdData ? loanByIdData.loanDate : null } autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nominal</Form.Label>
                                <Form.Control type="number" placeholder="Example: 3000000" defaultValue={loanByIdData ? loanByIdData.nominal : null } ref={nominalUpdateField} autoComplete="off" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Angsuran/Periode</Form.Label>
                                <Form.Control type="number" placeholder="Example: 12" defaultValue={loanByIdData ? loanByIdData.installmentAmount : null } ref={installmentAmountUpdateField} autoComplete="off" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFormUpdateLoan}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdateLoan}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ----------------- End Modal Form Update Loan ----------------- */}

            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default Loan;